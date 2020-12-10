<template>
<div class="error-page">
  <div class="error-page__img">
    <inline-svg src="/icons/404.svg"/>
  </div>
  <div class="error-page__text"><h3 class="error-page__title">page not found :(</h3>
    <p class="error-page__subtitle">Return to home page or use the search</p></div>
<!--  <form class="search-block" @submit.prevent="load">-->
<!--    <div class="search-block__content">-->
<!--      <div class="input-group input-group_icon_left">-->
<!--        <div class="search-block__row">-->
<!--          <div class="search-block__group-select"><span class="search-loupe-icon"><span-->
<!--            class="input-group__prefix">-->
<!--                <svg-->
<!--                  xmlns="http://www.w3.org/2000/svg"-->
<!--                  viewBox="0 0 17.86 15.8" width="17.86" height="15.8" fill="#dce1e4">-->
<!--                  <g><g>-->
<!--                    <path-->
<!--                      d="M3.06,3.92a5,5,0,1,1,.86,7,5,5,0,0,1-.86-7M1.49,2.69a7,7,0,1,0,9.83-1.2,7,7,0,0,0-9.83,1.2Z"></path>-->
<!--                    <rect x="13.48" y="9.35" width="2" height="7"-->
<!--                          transform="translate(-4.57 16.34) rotate(-51.96)"></rect>-->
<!--                  </g></g>-->
<!--                </svg>-->
<!--              </span>-->
<!--              </span>-->
<!--            <div class="input-group input-group_block">-->
<!--              <div class="select__control">-->
<!--                <div class="select__value-container">-->
<!--                  <input  class="select__input" placeholder="Enter a topic..." @change="changeSearch">-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div style="display:flex">-->
<!--            <div class="input-group__append">-->
<!--              <div class="search-block__btn">-->
<!--                <button type="submit" class="btn btn_block">Search</button>-->
<!--                <div class="search-icon">-->
<!--                  <img src="/icons/search.svg">-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="input-group__append">-->
<!--              <div class="search-block__btn  clear-btn">-->
<!--                <button class="btn btn_block" @click="clear">Show all</button>-->
<!--                <div class="search-icon" @click="clear"><img src="/icons/close.svg"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </form>-->
</div>
</template>
