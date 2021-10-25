import { Builder, By, Capabilities, until, WebDriver } from "selenium-webdriver";

export class WarrantHandler{

    driver: WebDriver;
    url: string = "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html";

    //locators
    title: By = By.css(".cake");
    headerInput: By = By.name("hdrInput");
    mkeInput: By = By.name("mkeInput");
    oaiInput: By = By.name("oriInput");
    nameInput: By = By.name("namInput");
    sexInput: By = By.name("sexInput");
    raceInput: By = By.name("racInput");
    heightInput: By = By.name("hgtInput");
    weightInput: By = By.name("wgtInput");
    hairInput: By = By.name("haiInput");
    offenseInput: By = By.name("offInput");
    warrantDateInput: By = By.name("dowInput");
    dlInput: By = By.name("olnInput");
    dlStateInput: By = By.name("olsInput");
    dlExpiryDateInput: By = By.name("olyInput");
    lpInput: By = By.name("licInput");
    lpStateInput: By = By.name("lisInput");
    lpYearInput: By = By.name("liyInput");

    //buttons
    submitBtn: By = By.id("saveBtn");
    undoBtn: By = By.id("clearBtn");

    //text message to be sent to NCIC
    ncicTextMessage: By = By.name("queryBody");

    //list of error messages displayed on the screen
    errMsgs: By = By.css(".errorMessage");

    //error messages for mandatory fields
    headerMandatoryErrMsg: string = 'The field named "Header" must be included.';
    mkeMandatoryErrMsg: string = 'The field named "MKE" must be included.';
    oaiMandatoryErrMsg: string = 'The field named "Originating Agency Identifier" must be included.';
    nameMandatoryErrMsg: string = 'The field named "Name" must be included.';
    sexMandatoryErrMsg: string = 'The field named "Sex" must be included.';
    raceMandatoryErrMsg: string = 'The field named "Race" must be included.';
    heightMandatoryErrMsg: string = 'The field named "Height" must be included.';
    weightMandatoryErrMsg: string = 'The field named "Weight" must be included.';
    hairMandatoryErrMsg: string = 'The field named "Hair" must be included.';
    offenseMandatoryErrMsg: string = 'The field named "Offense" must be included.';
    warrantDateMandatoryErrMsg: string = 'The field named "Date of Warrant/Violation" must be included.';
    dlMandatoryErrMsg: string = 'If Operator\'s License Number, DL State, or DL Expiration Year are present, all three must be present.';
    lpMandatoryErrMsg: string = 'If License Plate, License State, or License Year are present, all three must be present.';

    //error messages for character length
    headerLengthErrMsg: string = 'The "Header" field should be between 9 and 19 characters long.';
    mkeLengthErrMsg: string = 'The "MKE" field should be between 2 and 4 characters long.';
    oaiLengthErrMsg: string = 'The "Originating Agency Identifier" field should be 9 characters long.';
    sexLengthErrMsg: string = 'The "Sex" field should be 1 character long.'
    raceLengthErrMsg: string = 'The "Race" field should be 1 character long.';
    heightLengthErrMsg: string = 'The "Height" field should be 3 characters long.';
    weightLengthErrMsg: string = 'The "Weight" field should be between 1 and 3 characters long.';
    offenseLengthErrMsg: string = 'The "Offense" field should be between 5 and 15 characters long.';
    warrantDateLengthErrMsg: string = 'The "Date of Warrant/Violation" field should be 8 characters long.';
    dlLengthErrMsg: string = 'The "Drivers License" field should be between 1 and 20 characters long.';
    dlStateLengthErrMsg: string = 'The "DL State" field should be 2 characters long.';
    dlExipryDateLengthErrMsg: string = 'The "DL Expiration Date" field should be 8 characters long.';
    lpLengthErrMsg: string = 'The "License Plate" field should be between 5 and 8 characters long.';
    lpStateLengthErrMsg: string = 'The "License State" field should be 2 characters long.';
    lpYearLengthErrMsg: string = 'The "License Year" field should be 4 characters long.';

    //error messages for character type or format
    sexCharTypeErrMsg: string = 'The "Sex" field must be entered in as a single character, M for male, F for female, U for unknown.';
    heightTypeErrMsg: string = 'The "Height" field can only include numeric characters.';
    weightTypeErrMsg: string = 'The "Weight" field can only include numeric characters.';
    dlExpiryDateFormatErrMsg: string = 'The "DL Expiration Date" field must be entered as a date, MMDDYYYY, no earlier than 01011900 and no later than today\'s date.';
    lpExpiryYearFormatErrMsg: string = 'The "License Year" field must be entered as a 4 digit year, YYYY, no earlier than 1900 and no later than this year.';

    //housekeeping methods for setting up the web driver, navigating and quitting

    constructor(driver?: WebDriver){
        if(driver) 
            this.driver = driver;
        else
            this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
    }

    async navigate(): Promise<void>{
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.title));
        return;
    }

    async quit(): Promise<void> {
        return this.driver.quit();
    }

    async createWarrant(
        headerText: string,
        mkeText: string,
        oaiText: string,
        nameText: string,
        sexText: string,
        raceText: string,
        heightText: string,
        weightText: string,
        hairText: string,
        offenseText: string,
        warrantDate: string,
        dlText: string,
        dlStateText: string,
        dlExpiryDateText: string,
        lpText: string,
        lpStateText: string,
        lpYearText: string
    ): Promise<void> {
        await this.setHeader(headerText);
        await this.setMKE(mkeText);
        await this.setOAI(oaiText);
        await this.setName(nameText);
        await this.setSex(sexText);
        await this.setRace(raceText);
        await this.setHeight(heightText);
        await this.setWeight(weightText);
        await this.setHair(hairText);
        await this.setOffense(offenseText);
        await this.setWarrantDate(warrantDate);
        await this.setDriversLicense(dlText);
        await this.setDriversLicenseState(dlStateText);
        await this.setDriversLicenseExpiryDate(dlExpiryDateText);
        await this.setLicensePlate(lpText);
        await this.setLicensePlateState(lpStateText);
        await this.setLicensePlateYear(lpYearText);
        return;
    }

    //Buttons to click

    async clickSubmitButton(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.submitBtn));
        return (await this.driver.findElement(this.submitBtn).click());
    }

    async clickUndoButton(): Promise<void> {
        await this.driver.wait(until.elementLocated(this.undoBtn));
        return (await this.driver.findElement(this.undoBtn).click());
    }

    //Messages to get

    async getErrorMessages(): Promise<string[]>{
        let errors = [];

        await this.driver.wait(until.elementLocated(this.errMsgs));
        let elements = await this.driver.findElements(this.errMsgs);
        for(let i=0; i<elements.length; i++){
            errors.push(await elements[i].getText());
        }

        return errors;
    }

    async getNCICTextString(): Promise<string> {
        return (await this.driver.findElement(this.ncicTextMessage).getText());
    }

    //helper method to determine if a specific error message exists in the list of error messages
    async doesErrorMessageExist(errorMessage: string): Promise<boolean>{

        let errMsgs: string[] = await this.getErrorMessages();
        let hasErrorMessage: boolean = false;

        for(let i=0; i<errMsgs.length; i++){
            if(errMsgs[i] == errorMessage){
                hasErrorMessage = true;
                break;
            }
        }

        return hasErrorMessage;
    }

    //modifiers
    async setHeader(headerText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.headerInput));
        return (await this.driver.findElement(this.headerInput).sendKeys(`${headerText}\n`));
    }

    async setMKE(mkeText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.headerInput));
        return (await this.driver.findElement(this.mkeInput).sendKeys(`${mkeText}\n`));
    }

    async setOAI(oaiText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.headerInput));
        return (await this.driver.findElement(this.oaiInput).sendKeys(`${oaiText}\n`));
    }

    async setName(nameText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.nameInput));
        return (await this.driver.findElement(this.nameInput).sendKeys(`${nameText}\n`));
    }

    async setSex(sexText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.sexInput));
        return (await this.driver.findElement(this.sexInput).sendKeys(`${sexText}\n`));
    }
    
    async setRace(raceText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.raceInput));
        return (await this.driver.findElement(this.raceInput).sendKeys(`${raceText}\n`));
    }

    async setHeight(heightText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.heightInput));
        return (await this.driver.findElement(this.heightInput).sendKeys(`${heightText}\n`));
    }

    async setWeight(weightText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.weightInput));
        return (await this.driver.findElement(this.weightInput).sendKeys(`${weightText}\n`));
    }

    async setHair(hairText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.hairInput));
        return (await this.driver.findElement(this.hairInput).sendKeys(`${hairText}\n`));
    }

    async setOffense(offenseText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.offenseInput));
        return (await this.driver.findElement(this.offenseInput).sendKeys(`${offenseText}\n`));
    }

    async setWarrantDate(warrantDateText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.warrantDateInput));
        return (await this.driver.findElement(this.warrantDateInput).sendKeys(`${warrantDateText}\n`));
    }

    async setDriversLicense(dlText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.dlInput));
        return (await this.driver.findElement(this.dlInput).sendKeys(`${dlText}\n`));
    }

    async setDriversLicenseState(dlStateText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.dlStateInput));
        return (await this.driver.findElement(this.dlStateInput).sendKeys(`${dlStateText}\n`));
    }

    async setDriversLicenseExpiryDate(dlExpiryText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.dlExpiryDateInput));
        return (await this.driver.findElement(this.dlExpiryDateInput).sendKeys(`${dlExpiryText}\n`));
    }

    async setLicensePlate(lpText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.lpInput));
        return (await this.driver.findElement(this.lpInput).sendKeys(`${lpText}\n`));
    }

    async setLicensePlateState(lpStateText: string): Promise<void> {
        await this.driver.wait(until.elementLocated(this.lpStateInput));
        return (await this.driver.findElement(this.lpStateInput).sendKeys(`${lpStateText}\n`));
    }

    async setLicensePlateYear(lpYearText: string) : Promise<void> {
        await this.driver.wait(until.elementLocated(this.lpYearInput));
        return (await this.driver.findElement(this.lpYearInput).sendKeys(`${lpYearText}\n`));
    }

}