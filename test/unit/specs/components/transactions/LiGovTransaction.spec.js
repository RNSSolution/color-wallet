import { shallowMount } from "@vue/test-utils"
import LiGovTransaction from "transactions/LiGovTransaction"
import transactions from "../../store/json/txs"

describe(`LiGovTransaction`, () => {
  let wrapper
  const propsData = {
    transaction: transactions[6],
    url: `/proposals`,
    bondingDenom: `stake`
  }

  beforeEach(() => {
    wrapper = shallowMount(LiGovTransaction, { propsData, stubs: [`router-link`] })
  })

  it(`proposals`, () => {
    expect(wrapper.vm.propose).toBe(true)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it(`deposits`, () => {
    wrapper.setProps({
      transaction: transactions[7]
    })

    expect(wrapper.vm.deposit).toBe(true)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it(`votes`, () => {
    wrapper.setProps({
      transaction: transactions[7]
    })

    expect(wrapper.vm.deposit).toBe(true)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
