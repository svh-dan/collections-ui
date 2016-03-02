/* global moment */

import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model () {
        return this.store.createRecord('collectionobject', {
            objectAttribute: this.store.createRecord('collection-object-attribute', {
                timestampCreated: moment().unix()
            })
        });
    },

    deactivate () {
        let model = this.controllerFor('collectionobject.new').get('model');

        // TODO: Create a mixin to override `rollbackAttributes` and
        // apply `rollbackAttributes` to any dirty relationship as well.
        model.rollbackAttributes();
    }
});
