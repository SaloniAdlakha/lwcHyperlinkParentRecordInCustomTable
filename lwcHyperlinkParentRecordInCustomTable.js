import { LightningElement, wire} from 'lwc';
import fetchAccounts from '@salesforce/apex/Fetch_Accounts_To_Filter_Data.fetchAccounts';

export default class LwcHyperlinkParentRecordInCustomTable extends LightningElement {

    records;
    error;

    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {
        if ( data ) {
            let rows = JSON.parse( JSON.stringify( data ) );                
            for ( let i = 0; i < rows.length; i++ ) {  
                let dataParse = rows[ i ];
                dataParse.OwnerName = dataParse.Owner.Name;
                dataParse.OwnerURL = "/" + dataParse.OwnerId;
            }
            this.records = rows;
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.records = undefined;
        }
    }  
}
