const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');
const webpack = require('@cypress/webpack-preprocessor');
const {
    addCucumberPreprocessorPlugin
} = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
    env: {
        // issuePrefix: 'https://your.domain.atlassian.net/browse/',
        // tmsPrefix: 'https://some.testrail.instance/path/suite/caseID-',
        email: 'ihtishamkhattak9504@gmail.com',
        password: 't1isREjH1133!@#$',
        product:
            'https://www.amazon.com/stores/page/1458F1CA-7078-4528-AEF5-268CE48680C0?ingress=3'
    },
    e2e: {
        setupNodeEvents: async function (on, config) {
            await addCucumberPreprocessorPlugin(on, config);
            on(
                'file:preprocessor',
                webpack({
                    webpackOptions: {
                        resolve: { extensions: ['.ts', '.js'] },
                        module: {
                            rules: [
                                {
                                    test: /\.feature$/,
                                    use: [
                                        {
                                            loader: '@badeball/cypress-cucumber-preprocessor/webpack',
                                            options: config
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                })
            );
            allureWriter(on, config);
            return config;
        }
    }
});
