import { shallowMount, createLocalVue } from "@vue/test-utils"
import TableInvoice from "src/ActionModal/components/TableInvoice"

describe(`TableInvoice`, () => {
  let wrapper
  const localVue = createLocalVue()
  localVue.directive(`tooltip`, () => {})

  beforeEach(() => {
    wrapper = shallowMount(TableInvoice, {
      localVue,
      propsData: {
        amount: 17.2,
        estimatedFee: 0.030864,
        bondDenom: `CLR`
      }
    })
  })

  it(`should render correctly`, async () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it(`should display the correct subtotal`, async () => {
    expect(wrapper.text()).toMatch(/17.2[0]+ CLR/)
  })

  it(`should display the correct network fee`, async () => {
    expect(wrapper.text()).toMatch(/0.03086[0-9]+/)
  })

  it(`should display the correct total`, async () => {
    expect(wrapper.text()).toMatch(/17.23086[0-9]+ CLR/)
  })
})
