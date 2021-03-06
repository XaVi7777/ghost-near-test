const debug = require('@tryghost/debug')('services:routing:controllers:unsubscribe');
const path = require('path');
const megaService = require('../../../../server/services/mega');
const renderer = require('../../rendering');

module.exports = async function unsubscribeController(req, res) {
    debug('unsubscribeController');

    let data = {};

    try {
        data.member = await megaService.mega.handleUnsubscribeRequest(req);
    } catch (err) {
        data.error = err.message;
    }

    const templateName = 'unsubscribe';

    res.routerOptions = {
        type: 'custom',
        templates: templateName,
        defaultTemplate: path.resolve(__dirname, '../../../views/', templateName)
    };

    return renderer.renderer(req, res, data);
};
