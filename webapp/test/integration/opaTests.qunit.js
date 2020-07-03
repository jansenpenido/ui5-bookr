/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"io/jansenpenido/bookr/bookr/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});