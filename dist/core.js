'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (languages, hooks) {
  var provideExtractedMessages = hooks.provideExtractedMessages,
      outputSingleFile = hooks.outputSingleFile,
      getDefaultMessages = hooks.getDefaultMessages,
      outputDuplicateKeys = hooks.outputDuplicateKeys,
      beforeReporting = hooks.beforeReporting,
      provideLangTemplate = hooks.provideLangTemplate,
      provideTranslationsFile = hooks.provideTranslationsFile,
      provideWhitelistFile = hooks.provideWhitelistFile,
      getLanguageReport = hooks.getLanguageReport,
      reportLanguage = hooks.reportLanguage,
      afterReporting = hooks.afterReporting;


  var extractedMessages = provideExtractedMessages();

  if (typeof outputSingleFile === 'function') outputSingleFile(extractedMessages);

  var defaultMessages = getDefaultMessages(extractedMessages);

  if (typeof outputDuplicateKeys === 'function') outputDuplicateKeys(defaultMessages.duplicateIds);

  if (typeof beforeReporting === 'function') beforeReporting();

  languages.forEach(function (lang) {
    var langResults = provideLangTemplate(lang);

    var file = provideTranslationsFile(lang);
    var whitelistFile = provideWhitelistFile(lang);

    if (!file) langResults.noTranslationFile = true;
    if (!whitelistFile) langResults.noWhitelistFile = true;

    langResults.report = getLanguageReport(defaultMessages.messages, file, whitelistFile);

    if (typeof reportLanguage === 'function') reportLanguage(langResults);
  });

  if (typeof afterReporting === 'function') afterReporting();
};