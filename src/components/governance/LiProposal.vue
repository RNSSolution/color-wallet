<template>
  <tr class="data-table__row li-proposal">
    <td class="data-table__row__info">
      <div class="data-table__row__info__container">
        <span
          v-if="proposal.proposal_status === `Passed`"
          v-tooltip.top="status.message"
          :class="status.color"
          class="data-table__row__info__container__status material-icons"
        >
          checkmark
        </span>
        <span
          v-else
          v-tooltip.top="status.message"
          :class="status.color"
          class="data-table__row__info__container__status"
        />
        <router-link
          :to="{
            name: 'Proposal',
            params: { proposalId: proposal.proposal_id }
          }"
          class="data-table__row__info__container__name"
        >
          {{ proposal.proposal_content.value.title }}
        </router-link>
        <p class="data-table__row__info__container__description">
          {{ description }}
        </p>
      </div>
    </td>
    <td>{{ `#` + proposal.proposal_id }}</td>
    <td class="li-proposal__value yes">
      <span v-if="roundedPercentagesTally.yes == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.yes | prettyDecimals }}%</span>
    </td>
    <td class="li-proposal__value no">
      <span v-if="roundedPercentagesTally.no == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.no | prettyDecimals }}%</span>
    </td>
    <!-- <td class="li-proposal__value no_with_veto">
      {{ roundedPercentagesTally.no_with_veto | prettyDecimals }}%
    </td> -->
    <td class="li-proposal__value abstain">
      <span v-if="roundedPercentagesTally.abstain == 0.01">{{ 0 }}%</span>
      <span v-else>{{ roundedPercentagesTally.abstain | prettyDecimals }}%</span>
    </td>
    <td class="requestedFund">
      {{ num.fullDecimals(num.atoms(proposal.proposal_content.value.requested_fund[0].amount)) }}
    </td>
    <td class="fundingCycle">
      {{ proposal.proposal_content.value.funding_cycle }}
    </td>
  </tr>
</template>

<script>
import BigNumber from "bignumber.js"
import { mapGetters } from "vuex"
import { roundObjectPercentages } from "../../utils"
import { prettyDecimals } from "../../scripts/num"
import num from "scripts/num"
export default {
  name: `li-proposal`,
  filters: {
    prettyDecimals
  },
  props: {
    proposal: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    num,
  }),
  computed: {
    ...mapGetters([`proposals`]),
    tally() {
      const { yes, no, abstain } =
        this.proposals.tallies[this.proposal.proposal_id] || {}

      const totalVotes = BigNumber(yes)
        .plus(no)
        .plus(abstain)
        .toNumber()
        // .plus(no_with_veto)
      const totalMult = totalVotes / 100
      return {
        yes: yes / totalMult || BigNumber(0),
        no: no / totalMult || BigNumber(0),
        abstain: abstain / totalMult || BigNumber(0),
        // no_with_veto: no_with_veto / totalMult || BigNumber(0)
      }
    },
    roundedPercentagesTally() {
      return roundObjectPercentages(this.tally)
    },
    isDepositPeriod() {
      return this.proposal.proposal_status === `DepositPeriod`
    },
    status() {
      switch (this.proposal.proposal_status) {
        case `Passed`:
          return {
            message: `This proposal has passed`
          }
        case `Rejected`:
          return {
            message: `This proposal has been rejected and voting is closed`,
            color: `red`
          }
        case `DepositPeriod`:
          return {
            message: `Deposits are open for this proposal`,
            color: `yellow`
          }
        case `VotingPeriod`:
          return {
            message: `Voting for this proposal is open`,
            color: `green`
          }
        default:
          return {
            message: `There was an error determining the status of this proposal.`,
            color: `grey`
          }
      }
    },
    description() {
      const { description } = this.proposal.proposal_content.value
      return description.length > 100
        ? description.substring(0, 100) + `…`
        : description.substring(0, 100)
    }
  }
}
</script>

<style>
.data-table__row__info__container__status.material-icons {
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  top: 4px;
  left: -4px;
  color: var(--success);
  background: none;
}
</style>
