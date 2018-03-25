import {HistoryResponse, Item, Record} from '../common/webservice';

export const MockHistoryResponse:HistoryResponse = {
    status: 200,
    status_message: "",
    data: [
        {
            data:{
                date_time: "2018-03-03 15:27:54",
                type: "DEPOSIT RM100",
                before_btc: "0.00",
                after_btc: "0.00",
                before_rm: "0.00",
                after_rm: "100.00",
                btc_price: "45752.00",
            }
        },
        {
            data:{
                date_time: "2018-03-03 15:49:39",
                type: "DEPOSIT RM200",
                before_btc: "0.00",
                after_btc: "0.00",
                before_rm: "0.00",
                after_rm: "200.00",
                btc_price: "45796.00",
            }
        }
    ]
}