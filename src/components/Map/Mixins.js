import Events from './Events'
import Families from './Families'
import Characters from './Characters'
import Statistics from './Statistics'
import ThreeDControl from './ThreeDControl'

export default {
  computed: {
    ...Events.computed,
    ...Families.computed,
    ...Characters.computed,
    ...Statistics.computed,
    ...ThreeDControl.computed
  },
  watch: {
    ...Events.watch,
    ...Families.watch,
    ...Characters.watch,
    ...Statistics.watch,
    ...ThreeDControl.watch
  },
  methods: {
    enterEvents: Events.enter,
    leaveEvents: Events.leave,
    enterFamilies: Families.enter,
    leaveFamilies: Families.leave,
    enterCharacters: Characters.enter,
    leaveCharacters: Characters.leave,
    enterStatistics: Statistics.enter,
    leaveStatistics: Statistics.leave,
    ...Events.methods,
    ...Families.methods,
    ...Characters.methods,
    ...Statistics.methods,
    ...ThreeDControl.methods
  }
}
