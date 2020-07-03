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
		},

		onSearch : function (oEvent) {
			this.byId("page").setBusy(true)

			const oModel = new sap.ui.model.json.JSONModel()
			sap.ui.getCore().setModel(oModel, "mBooksAPI")

			let sQuery = oEvent.getParameter("query").toLowerCase().replace(" ", "+")
			let sCallUrl = this.apiUrl + sQuery + "&maxResults=6"

			oModel.loadData(sCallUrl)
			oModel.attachRequestCompleted(this._handleRequestCompleted, this)
		},

		_handleRequestCompleted : function (oEvent) {
			let oData = oEvent.getSource().getData()
			console.log(oData)

			this.getView().setModel(new sap.ui.model.json.JSONModel(oData), "mBooksAPI")

			this.byId("page").setBusy(false)
		}
	});
});