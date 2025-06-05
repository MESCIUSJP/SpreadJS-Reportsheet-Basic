// 日本語カルチャー設定
GC.Spread.Common.CultureManager.culture("ja-jp");
//GC.Spread.Sheets.LicenseKey = "ここにSpreadJSのライセンスキーを設定します";

// SpreadJSの設定
document.addEventListener("DOMContentLoaded", () => {
    const spread = new GC.Spread.Sheets.Workbook("ss");
    let reportSheet;
    //----------------------------------------------------------------
    // sjs形式のテンプレートシートを読み込んでレポートシートを実行します
    //----------------------------------------------------------------
    const res = fetch('reports/products.sjs').then((response) => response.blob())
        .then((myBlob) => {
            spread.open(myBlob, () => {
                console.log(`読み込み成功`);
                reportSheet = spread.getSheetTab(0);

                // レポートシートのオプション設定
                reportSheet.renderMode('PaginatedPreview');
                reportSheet.options.printAllPages = true;

                // レポートシートの印刷設定
                var printInfo = reportSheet.printInfo();
                printInfo.showBorder(false);
                printInfo.zoomFactor(1);
                reportSheet.printInfo(printInfo);
            }, (e) => {
                console.log(`***ERR*** エラーコード（${e.errorCode}） : ${e.errorMessage}`);
            });
        });
});

