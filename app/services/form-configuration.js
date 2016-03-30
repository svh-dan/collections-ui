import Ember from 'ember';

const CONFIGURATIONS = {
    1: {
        type: 'zoology-mammals',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-determination': 'form-component/determination',
            'form-component-collecting-event': 'form-component/collecting-event',
            'form-component-preparation': 'form-component/preparation'
        }
    },
    2: {
        type: 'zoology-entomology',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-determination': 'form-component/determination',
            'form-component-collecting-event': 'form-component/collecting-event',
            'form-component-preparation': 'form-component/preparation'
        },
        component: {
            determination: {
                hide: {
                    confidence: true
                }
            }
        }
    },
    3: {
        type: 'zoology-invertebrate',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-determination': 'form-component/determination',
            'form-component-preparation': 'form-component/preparation',
            'form-component-collecting-event': 'form-component/collecting-event'   
        },
        component: {
            determination: {
                hide: {
                    method: true
                }
            }
        }
    },
    4: {
        type: 'botany',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-preparation': 'form-component/preparation',
            'form-component-collecting-event': 'form-component/collecting-event',
            'form-component-determination': 'form-component/determination'
        },
        component: {
            determination: {
                hide: {
                    method: true,
                    confidence: true,
                    'type-status': true
                }
            }
        }
    },
    5: {
        type: 'paleontology',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-collecting-event': 'form-component/collecting-event',
            'form-component-preparation': 'form-component/preparation',
            'form-component-determination': 'form-component/determination'
        },
        component: {
            'single-preparation': {
                'hide': {
                    'individuals-count': true,
                    'preparation-number': true
                }
            }
        }
    },
    6: {
        type: 'geology',
        components: {
            'form-component-basic-data': 'form-component/basic-data',
            'form-component-collecting-event': 'form-component/collecting-event',
            'form-component-determination': 'form-component/determination',
            'form-component-preparation': 'form-component/preparation'
        },
        component: {
            'single-preparation': {
                'hide': {
                    'individuals-count': true,
                    'preparation-number': true
                }
            },
            determination: {
                hide: {
                    confidence: true
                }
            }
        }
    }
};

export default Ember.Service.extend({

    /** Inject services. */
    session: Ember.inject.service('session'),
    
    /** All available configurations. */
    configurations: CONFIGURATIONS,
    
    /** Return active configuration. */
    configuration: Ember.computed('session.data.division', 'session.data.locale', function () {
        const DIVISION = this.get('session.data.division');
        const configuration = (
            this.get('configurations')[DIVISION] ||
            this.get('configurations')[1]
        );
        
        return configuration;
    }),
    
    /** Return type based on division. */
    type: Ember.computed.alias('configuration.type'),
    
    /** Return components based on division. */
    components: Ember.computed.alias('configuration.components'),
    
    /** Return component specific configurations based on division. */
    component: Ember.computed.alias('configuration.component')

});
