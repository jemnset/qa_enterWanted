import { WarrantHandler } from "./pageObjects/WarrantHandler";

const wh = new WarrantHandler();

describe("Enter Wanted", () => {
    beforeEach(async ()=> {
        await wh.navigate();
    });
    afterAll(async ()=> {
        await wh.quit();
    });
    /**
     * TC JN5DL-70 
     * Verifies that the Header field will accept a value between 9-19 characters
     * --> Fails if mandatory field error message appears
     * --> Fails if header length error message appears
     * https://dmutah.atlassian.net/browse/JN5DL-70 
     */ 
    it("JN5DL-70: Header field between 9-19 characters is valid", async ()=> {
        
        await wh.setHeader("Warrant !\n");
        await wh.clickSubmitButton();
        let hasMandatoryErrMsg = await wh.doesErrorMessageExist(wh.headerMandatoryErrMsg);
        let hasLengthErrMsg = await wh.doesErrorMessageExist(wh.headerLengthErrMsg);

        expect(hasMandatoryErrMsg && hasLengthErrMsg).toBe(false);

    });
    /**  
     * TC JN5DL-71
     * Verifies that the Header field will not accept a value between 1-8 characters
     * --> Fails if the header length error message message does not appear
     * --> Fails if the mandatory header error message appears
     * https://dmutah.atlassian.net/browse/JN5DL-71
     */
    it("JN5DL-71: Header field cannot be less than 9 characters in length", async ()=> {
        
        await wh.setHeader("Header !\n");
        await wh.clickSubmitButton();
        let hasMandatoryErrMsg = await wh.doesErrorMessageExist(wh.headerMandatoryErrMsg);
        let hasLengthErrMsg = await wh.doesErrorMessageExist(wh.headerLengthErrMsg);        

        expect(hasMandatoryErrMsg).toBe(false);
        expect(hasLengthErrMsg).toBe(true);

    });
    /**  
     * TC JN5DL-72
     * Verifies that the Header field will not accept a value with 20+ characters
     * --> Fails if the header length error message message does not appear
     * --> Fails if the mandatory header error message appears
     * https://dmutah.atlassian.net/browse/JN5DL-72
     */
    it("JN5DL-72: Header field cannot be greater than 19 characters in length", async ()=> {
        
        await wh.setHeader("Warrant Test For 1.4\n");
        await wh.clickSubmitButton();
        let hasMandatoryErrMsg = await wh.doesErrorMessageExist(wh.headerMandatoryErrMsg);
        let hasLengthErrMsg = await wh.doesErrorMessageExist(wh.headerLengthErrMsg);        

        expect(hasMandatoryErrMsg).toBe(false);
        expect(hasLengthErrMsg).toBe(true);

    });
    /**  
     * TC JN5DL-73
     * Verifies that the Header field cannot be blank
     * --> Fails if the header length error message message appears
     * --> Fails if the mandatory header error message does not appear
     * https://dmutah.atlassian.net/browse/JN5DL-73
     */
    it("JN5DL-73: Header is a mandatory field", async ()=> {
        
        //Need to type something into a field to enable the submit button
        await wh.setMKE("W\n");
        await wh.clickSubmitButton();
        let hasMandatoryErrMsg = await wh.doesErrorMessageExist(wh.headerMandatoryErrMsg);
        let hasLengthErrMsg = await wh.doesErrorMessageExist(wh.headerLengthErrMsg);        

        expect(hasMandatoryErrMsg).toBe(true);
        expect(hasLengthErrMsg).toBe(false);
    });
});