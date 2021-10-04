import { LightningElement } from 'lwc';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_TYPE from '@salesforce/schema/Account.Type';

export default class NewAccountCreation extends LightningElement {

    objectApiName = 'Account';
    fieldList = [ACCOUNT_NAME,ACCOUNT_TYPE];
    handleAccountCreate(event){
        
    }
}