import DS from 'ember-data';
import Ember from 'ember';

import {validator, buildValidations} from 'ember-cp-validations';

const Validations = buildValidations({
    localityName: validator('presence', {
        presence: true,
        descriptionKey: 'fields.labels.collecting_place'
    })
});

export default DS.Model.extend(Validations, {

    session: Ember.inject.service('session'),

    localityName: DS.attr('string'),

    latitude: DS.attr('number'),
    longitude: DS.attr('number'),

    maxElevation: DS.attr('number'),
    minElevation: DS.attr('number'),
    timestampCreated: DS.attr('number'),

    geography: DS.belongsTo('geography', {async: true}),
    agent: DS.belongsTo('agent', {async: true}),
    srcLatLongUnit: DS.attr('number', {
        defaultValue() { return 0; }
    }),
    createdByAgentID: DS.attr('number', {
        defaultValue() {
            return this.get('session.data.authenticated.id');
        }
    }),
    /** Locality location converted to array. */
    location: Ember.computed('latitude', 'longitude',  {
        get () {
            return [
                this.get('latitude'),
                this.get('longitude')
            ];
        },
        set (key, coordinates) {
            this.set('latitude', coordinates[0]);
            this.set('longitude', coordinates[1]);

            return coordinates;
        }
    }),

    validLocation: Ember.computed('latitude', 'longitude', function () {
        return !Ember.isBlank(this.get('latitude')) && !Ember.isBlank(this.get('longitude'));
    })
});
