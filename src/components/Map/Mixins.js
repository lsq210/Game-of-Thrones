import Events from './Events'
import Families from './Families'
import Characters from './Characters'
import Statistics from './Statistics'
import ThreeDControl from './ThreeDControl'
import About from './About'

export default {
  computed: {
    ...Events.computed,
    ...Families.computed,
    ...Characters.computed,
    ...Statistics.computed,
    ...ThreeDControl.computed
    ...About.computed
  },
  watch: {
    ...Events.watch,
    ...Families.watch,
    ...Characters.watch,
    ...Statistics.watch,
    ...ThreeDControl.watch
    ...About.watch
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
    ...Events.methods,
    ...Families.methods,
    ...Characters.methods,
    ...Statistics.methods,
    ...ThreeDControl.methods
    ...About.methods
  }
}
