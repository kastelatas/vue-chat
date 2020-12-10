<template>
  <div class="payment"><h2 class="payment__title">Payments</h2>
    <div class="wallet"><p class="wallet__title">Choose your wallet</p>
      <div class="wallet__row">
        <div class="wallet__block"><input type="radio" class="wallet__radio" id="0" name="payment-wallet"><label
          for="0"><img src="/icons/ppcom.svg" alt=""></label></div>
      </div>
    </div>
    <div class="withdrawal">
      <div class="withdrawal__row">
        <div class="withdrawal__block"><p class="withdrawal__title">Your balance</p>
          <p class="withdrawal__subtitle">80.00</p></div>
        <div class="withdrawal__block"><p class="withdrawal__title">Talkens amount</p>
          <input type="number"
                 class="withdrawal__input"
                 value="0"></div>
        <div class="withdrawal__button">
          <button type="button" class="btn">Submit</button>
        </div>
      </div>
    </div>
    <h2 class="payment__title">Transactions</h2>
    <div class="payment__row"><p class="payment__text">Choose a period:</p>
      <input type="text" placeholder="-"
             class="payment__input-period"
             value="08.08.52795">
      <input type="text"
             placeholder="-"
             class="payment__input-period"
             value="08.08.52795">
      <div class="payment__select-block"><p class="payment__text">Wallet:</p>
        <div class="input-group_block sorting-select css-2b097c-container">
          <div class="select__control css-yk16xz-control">
            <div class="select__value-container select__value-container--has-value css-1hwfws3">
              <input id="react-select-4-input" readonly="" tabindex="0" aria-autocomplete="list"
                     class="css-62g3xt-dummyInput" value=""></div>
            <div class="select__indicators css-1wy0on6"><span
              class="select__indicator-separator css-1okebmr-indicatorSeparator"></span>

            </div>
          </div>
        </div>
      </div>
      <button class="btn btn_block btn-outline-primary" type="button">Filter</button>
    </div>
    <div class="payment__filter-statistic">
      <div class="payment__filter-statistic_overlay">
        <div class="payment__filter-statistic_block">
          <inline-svg src="/icons/ppcom_min.svg" alt=""
                      class="payment__filter-statistic_block-img"/>
          <span
            class="payment__filter-statistic_block-date">aug 04, 2020</span><span
          class="payment__filter-statistic_block-time">12:08 PM</span>
          <div class="payment__block-status"><span class="payment__filter-statistic_block-status payment-success">Successful transaction</span><span
            class="payment__filter-statistic_block-price">$250</span></div>
        </div>
        <div class="payment__filter-statistic_block">
          <inline-svg src="/icons/ppcom_min.svg" alt=""
                      class="payment__filter-statistic_block-img"/>
          <span
            class="payment__filter-statistic_block-date">aug 04, 2020</span><span
          class="payment__filter-statistic_block-time">12:08 PM</span>
          <div class="payment__block-status">
            <div><span class="payment__filter-statistic_block-status payment-denied">Denied</span><i
              class="payment__filter-statistic__tooltip" data-tooltip="Available after the first deposit"> ? </i></div>
            <span class="payment__filter-statistic_block-price">$1384</span></div>
        </div>
      </div>
      <p class="payment__filter-statistic-total">Total: <span class="payment__filter-statistic_bold">$5876</span></p>
    </div>
  </div>
</template>
