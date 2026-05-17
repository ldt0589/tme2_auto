export const CompanySelectors = {
  addNewCompanyBtn: 'button:has-text("Add New Company")',
  comNameInput: '//label[text()="Company Name"]/following-sibling::input',
  latitudeInput: '//label[text()="Latitude"]/following-sibling::input',
  longitudeInput: '//label[text()="Longitude"]/following-sibling::input',
  currencyDropdown: '//label[text()="Currency"]/ancestor::div[contains(@class,"v-select__slot")]',
  saveButton: 'button:has-text("Save")',
  cancelButton: 'button:has-text("Cancel")',
} as const;