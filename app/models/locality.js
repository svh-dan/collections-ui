import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
    localityName: DS.attr('string'),

    latitude1: DS.attr('number'),
    longitude1: DS.attr('number'),

    maxElevation: DS.attr('number'),
    minElevation: DS.attr('number'),
    timestampCreated: DS.attr('number'),

    geography: DS.belongsTo('geography', {async: true}),
    agent: DS.belongsTo('agent', {async: true}),

    /** Locality location converted to array. */
    location: Ember.computed('latitude1', 'longitude1',  function () {
        return [
            this.get('latitude1'),
            this.get('longitude1')
        ];
    }),
});
