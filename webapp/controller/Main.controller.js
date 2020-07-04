sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox"
], function (Controller, MessageBox) {
	"use strict";

	return Controller.extend("io.jansenpenido.bookr.bookr.controller.Main", {
		apiUrl: 'https://www.googleapis.com/books/v1/volumes?q=',

		onInit: function () {
			this._oComponent = this
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())

			this._getBestSellers()
		},

		onSearch : function (oEvent) {
			this.byId("page").setBusy(true)

			const oModel = new sap.ui.model.json.JSONModel()
			sap.ui.getCore().setModel(oModel, "mBooksSearch")

			let sQuery = oEvent.getParameter("query").toLowerCase().replace(" ", "+")
			let sCallUrl = this.apiUrl + sQuery + "&maxResults=6"

			oModel.loadData(sCallUrl)
			oModel.attachRequestCompleted(this._handleSearchCompleted, this)
		},

		_handleSearchCompleted : function (oEvent) {
			let oData = oEvent.getSource().getData()
			this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "mBooksSearch")

			this.byId("page").setBusy(false)
		},

		_getBestSellers : function () {
			this.byId("page").setBusy(true)

			const oModel = new sap.ui.model.json.JSONModel()
			sap.ui.getCore().setModel(oModel, "mBooksSearch")

			let sCallUrl = this.apiUrl + "subject:authors&maxResults=9"

			oModel.loadData(sCallUrl)
			oModel.attachRequestCompleted(this._handleBestSellersCompleted, this)
		},

		_handleBestSellersCompleted : function (oEvent) {
			let oData = oEvent.getSource().getData()
			this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "mBooksBestSellers")

			this.byId("page").setBusy(false)
		}
	});
});