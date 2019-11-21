import Events from './Events'
import Families from './Families'
import Characters from './Characters'
import ThreeDControl from './ThreeDControl'
import About from './About'
import Visualization from './Visualization'

export default {
  computed: {
    ...Events.computed,
    ...Families.computed,
    ...Characters.computed,
    ...ThreeDControl.computed,
    ...About.computed,
    ...Visualization.computed
  },
  watch: {
    ...Events.watch,
    ...Families.watch,
    ...Characters.watch,
    ...ThreeDControl.watch,
    ...About.watch,
    ...Visualization.watch
  },
  methods: {
    enterEvents: Events.enter,
    leaveEvents: Events.leave,
    enterFamilies: Families.enter,
    leaveFamilies: Families.leave,
    enterCharacters: Characters.enter,
    leaveCharacters: Characters.leave,
    enterAbout: About.enter,
    leaveAbout: About.leave,
    enterVisualization: Visualization.enter,
    leaveVisualization: Visualization.leave,
    ...Events.methods,
    ...Families.methods,
    ...Characters.methods,
    ...ThreeDControl.methods,
    ...About.methods,
    ...Visualization.methods
  }
}
