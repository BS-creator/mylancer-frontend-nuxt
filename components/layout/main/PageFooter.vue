<template>
  <div id="footer" v-show="this.$store.getters['settings/getShowFooter']">
    <!-- Footer Top Section -->
    <div class="footer-top-section">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <!-- Footer Rows Container -->
            <div class="footer-rows-container">
              <!-- Left Side -->
              <div class="footer-rows-left">
                <div class="footer-row">
                  <div class="footer-row-inner footer-logo">
                    <pure-logo></pure-logo>
                  </div>
                </div>
              </div>

              <!-- Right Side -->
              <div class="footer-rows-right">
                <!-- Social Icons -->
                <div class="footer-row">
                  <div class="footer-row-inner">
                    <ul class="footer-social-links">
                      <li>
                        <a
                          href="#"
                          title="Facebook"
                          data-tippy-placement="bottom"
                          data-tippy-theme="light"
                        >
                          <i class="icon-brand-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          title="Twitter"
                          data-tippy-placement="bottom"
                          data-tippy-theme="light"
                        >
                          <i class="icon-brand-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          title="Google Plus"
                          data-tippy-placement="bottom"
                          data-tippy-theme="light"
                        >
                          <i class="icon-brand-google-plus-g"></i>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          title="LinkedIn"
                          data-tippy-placement="bottom"
                          data-tippy-theme="light"
                        >
                          <i class="icon-brand-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                  </div>
                </div>

                <!-- Language Switcher -->
                <!-- <div class="footer-row">
                  <div class="footer-row-inner">
                    <select
                      class="selectpicker language-switcher"
                      data-selected-text-format="count"
                      data-size="5"
                    >
                      <option selected>English</option>
                      <option>Français</option>
                      <option>Español</option>
                      <option>Deutsch</option>
                    </select>
                  </div>
                </div> -->
              </div>
            </div>
            <!-- Footer Rows Container / End -->
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Top Section / End -->

    <!-- Footer Middle Section -->

    <!-- Footer Middle Section / End -->

    <!-- Footer Copyrights -->
    <div class="footer-bottom-section">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            © 2020 <strong>MyLancer</strong>. All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
    <!-- Footer Copyrights / End -->
  </div>
</template>

<script>
import PureLogo from '@/components/PureLogo'

export default {
  components: {
    PureLogo,
  },
}
</script>
<style lang="scss">
.footer-row-inner.footer-logo {
  margin-top: 30px;
}
</style>
