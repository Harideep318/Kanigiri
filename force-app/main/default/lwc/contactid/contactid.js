import { LightningElement, wire } from "lwc";
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import Account_NAME from "@salesforce/schema/User.Account.Name";
import Account_Rating from "@salesforce/schema/User.Account.Rating";


// this gets you the logged in user
import USER_ID from "@salesforce/user/Id";
export default class LogoAndApplicantName extends LightningElement {

  @wire(getRecord, { recordId: USER_ID, fields: [Account_NAME,Account_Rating ] })
  user;

  get contactId() {
    return getFieldValue(this.user.data, Account_NAME);
  }
  
  get Rating() {
    return getFieldValue(this.user.data, Account_Rating);
  }
}