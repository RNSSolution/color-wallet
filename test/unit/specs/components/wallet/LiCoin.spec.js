import { shallowMount } from "@vue/test-utils"
import LiCoin from "src/components/wallet/LiCoin"

describe(`LiCoin`, () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(LiCoin, {
      propsData: {
        coin: {
          denom: `COLOR`,
          amount: `10000000000`
        }
      },
      mocks: {
        $store: {
          getters: {
            lastHeader: {
              chain_id: `colors-test-01`
            }
          }
        }
      }
    })
  })

  it(`has the expected html structure`, () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it(`should calculate the full amount of the coin`, () => {
    expect(wrapper.vm.amount).toEqual(`10,000.000000`)
  })

  it(`should capitalize the coin denomination`, () => {
    expect(wrapper.vm.denomination).toEqual(`COLOR`)
  })
})
