<template>
  <div id="user-profile-page">
    <!-- Titlebar
================================================== -->
    <div class="single-page-header freelancer-header">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="single-page-header-inner">
              <div class="left-side">
                <div class="header-image freelancer-avatar">
                  <el-image :src="avatar" :alt="'avatar ' + profile.username" />
                  <el-button
                    class="btn-profile-edit avatar"
                    @click="edit_avatar = !edit_avatar"
                    v-if="can_edit"
                    icon="el-icon-camera-solid"
                    circle
                  ></el-button>

                  <!-- Avatar Cropper -->
                  <div
                    class="upload-avatar"
                    v-bind:class="{ visibility_hidden: !edit_avatar }"
                  >
                    <i
                      class="el-icon-close close"
                      @click="edit_avatar = false"
                    ></i>
                    <h3><b>Edit Profile Picture</b></h3>
                    <p>Recommended size: 280px 280px</p>
                    <cropper
                      class="upload-avatar-cropper"
                      image-restriction="stencil"
                      stencil-component="circle-stencil"
                      @change="onChange"
                      :src="image"
                      :min-height="280"
                      :min-width="280"
                      :max-height="1280"
                      :max-width="1280"
                      :size-restrictions-algorithm="pixelsRestriction"
                      :default-position="defaultPosition"
                      :default-size="defaultSize"
                      :stencil-props="{
                        aspectRatio: 1,
                      }"
                    />
                    <div class="button-wrapper">
                      <el-button
                        type="primary"
                        @click="uploadAvatar"
                        class="full-width"
                        :loading="avatar_uploading"
                      >
                        Set as Profile Picture
                      </el-button>
                      <el-button type="text" @click="$refs.avatar_file.click()"
                        >Change Picture</el-button
                      >
                      <input
                        type="file"
                        ref="avatar_file"
                        @change="selectImage($event)"
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
                <div class="header-details">
                  <h3>
                    {{ profile.first_name }} {{ profile.last_name }}
                    <span>
                      <span style="text-decoration: underline; display: inline">
                        {{ headline }}
                      </span>
                      <el-button
                        class="btn-profile-edit headline"
                        @click="headlineDialog = true"
                        v-if="can_edit"
                        icon="el-icon-edit"
                        circle
                      ></el-button>
                    </span>
                  </h3>
                  <ul>
                    <li>
                      <el-rate
                        v-model="rate"
                        disabled
                        show-score
                        text-color="#ff9900"
                        class="review-rate"
                      >
                      </el-rate>
                    </li>
                    <li>
                      <img
                        class="flag"
                        :src="
                          '/images/flags/' +
                          profile.location.countryCode +
                          '.svg'
                        "
                        alt=""
                      />
                      {{ profile.location.countryName }}
                    </li>
                    <li>
                      <div class="verified-badge-with-title">Verified</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="background-image-container"
        style="background-image: url('/images/profile/no-cover.png')"
      ></div>
    </div>

    <!-- Page Content
================================================== -->
    <div class="container">
      <el-row :gutter="20">
        <!-- Content -->
        <el-col :md="16">
          <!-- Page Content -->
          <el-card>
            <div class="single-page-section">
              <h3 class="margin-bottom-25">
                <span style="font-weight: 600; margin-right: 5px">
                  About Me
                </span>
                <!-- <el-button
                  class="btn-profile-edit"
                  @click="openEditModal"
                  v-if="can_edit"
                  icon="el-icon-edit"
                  circle
                ></el-button> -->
                <span class="float-right margin-right-25">
                  <b>${{ parseInt(hourly_rate).toFixed(2) }} / hr</b>
                  <el-button
                    class="btn-profile-edit hourly_rate margin-left-7"
                    @click="hourlyRateDialog = true"
                    v-if="can_edit"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                </span>
              </h3>
              <p>
                <el-button
                  class="btn-profile-edit description"
                  @click="summaryDialog = true"
                  v-if="can_edit"
                  icon="el-icon-edit"
                  circle
                ></el-button>
                <span>{{ summary }}</span>
              </p>
            </div>
          </el-card>

          <!-- Boxed List -->
          <el-card>
            <div class="boxed-list margin-bottom-60">
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-thumb-up"></i> Work History
                  and Feedback
                </h3>
              </div>
              <ul class="boxed-list-ul">
                <li>
                  <div class="boxed-list-item">
                    <!-- Content -->
                    <div class="item-content">
                      <h4>
                        Web, Database and API Developer
                        <span>Rated as Freelancer</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0"></div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i>
                          August 2019
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          Excellent programmer - fully carried out my project in
                          a very professional manner.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="boxed-list-item">
                    <!-- Content -->
                    <div class="item-content">
                      <h4>
                        WordPress Theme Installation
                        <span>Rated as Freelancer</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0"></div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i> June
                          2019
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="boxed-list-item">
                    <!-- Content -->
                    <div class="item-content">
                      <h4>
                        Fix Python Selenium Code <span>Rated as Employer</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0"></div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i> May
                          2019
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          I was extremely impressed with the quality of work AND
                          how quickly he got it done. He then offered to help
                          with another side part of the project that we didn't
                          even think about originally.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="boxed-list-item">
                    <!-- Content -->
                    <div class="item-content">
                      <h4>
                        PHP Core Website Fixes <span>Rated as Freelancer</span>
                      </h4>
                      <div class="item-details margin-top-10">
                        <div class="star-rating" data-rating="5.0"></div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i> May
                          2019
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          Awesome work, definitely will rehire. Poject was
                          completed not only with the requirements, but on time,
                          within our small budget.
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>

              <!-- Pagination -->
              <div class="clearfix"></div>
              <div class="pagination-container margin-top-40 margin-bottom-10">
                <nav class="pagination">
                  <ul>
                    <li>
                      <a href="#" class="ripple-effect current-page">1</a>
                    </li>
                    <li><a href="#" class="ripple-effect">2</a></li>
                    <li class="pagination-arrow">
                      <a href="#" class="ripple-effect"
                        ><i
                          class="icon-material-outline-keyboard-arrow-right"
                        ></i
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div class="clearfix"></div>
              <!-- Pagination / End -->
            </div>
          </el-card>
          <!-- Boxed List / End -->

          <!-- Boxed List -->
          <el-card>
            <div class="boxed-list margin-bottom-60">
              <div class="boxed-list-headline">
                <h3>
                  <i class="icon-material-outline-business"></i> Employment
                  History
                </h3>
                <el-button
                  class="btn-profile-edit employment-history float-right"
                  @click="employmentHistoryAddDialog = true"
                  v-if="can_edit"
                  icon="el-icon-plus"
                  circle
                ></el-button>
              </div>
              <ul
                v-if="employmentHistories.length > 0"
                class="boxed-list-ul employment-history-list"
              >
                <li v-for="history in employmentHistories" :key="history.id">
                  <div class="boxed-list-item">
                    <!-- Content -->
                    <div class="item-content">
                      <h4>
                        <p>{{ history.title }}</p>
                      </h4>
                      <div class="item-details margin-top-7">
                        <div class="detail-item">
                          <a href="#"
                            ><i class="icon-material-outline-business"></i>
                            {{ history.company }}</a
                          >
                        </div>
                        <div class="detail-item">
                          <i class="icon-material-outline-date-range"></i>
                          {{ months[history.start_month - 1].label }}
                          {{ history.start_year }} -
                          {{
                            history.curr_working_here == 1
                              ? 'Present'
                              : months[history.end_month - 1].label +
                                ' ' +
                                history.end_year
                          }}
                        </div>
                      </div>
                      <div class="item-description">
                        <p>
                          {{ history.summary }}
                        </p>
                      </div>
                    </div>

                    <!-- Action Btns -->
                    <div>
                      <el-button
                        type="text"
                        icon="el-icon-edit"
                        circle
                        style="padding: 0"
                        @click="openHistoryEditModal(history.id)"
                      ></el-button>
                      <el-popconfirm
                        confirm-button-text="Yes"
                        cancel-button-text="No"
                        icon="el-icon-info"
                        icon-color="red"
                        title="Are you sure to delete this?"
                        @onConfirm="deleteEmploymentHistory(history.id)"
                      >
                        <el-button
                          slot="reference"
                          type="text"
                          icon="el-icon-delete"
                          circle
                          style="padding: 0"
                        ></el-button>
                      </el-popconfirm>
                    </div>
                  </div>
                </li>
              </ul>
              <ul
                v-if="employmentHistories.length == 0"
                class="boxed-list-ul employment-history-list"
              >
                <li class="italic">No employment histories have been added.</li>
              </ul>
            </div>
          </el-card>
          <!-- Boxed List / End -->
        </el-col>

        <!-- Sidebar -->
        <el-col :md="8">
          <div class="sidebar-container">
            <!-- Profile Overview -->
            <el-card>
              <div class="profile-overview">
                <div class="overview-item">
                  <strong>${{ hourly_rate }}</strong>
                  <span>Hourly Rate</span>
                </div>
                <div class="overview-item">
                  <strong>53</strong><span>Jobs Done</span>
                </div>
                <div class="overview-item">
                  <strong>22</strong><span>Rehired</span>
                </div>
              </div>
              <!-- Button -->
              <a
                href="#small-dialog"
                class="apply-now-button popup-with-zoom-anim margin-bottom-50"
                >Make an Offer
                <i class="icon-material-outline-arrow-right-alt"></i
              ></a>

              <!-- Freelancer Indicators -->
              <div class="sidebar-widget">
                <div class="freelancer-indicators">
                  <!-- Indicator -->
                  <div class="indicator">
                    <strong>88%</strong>
                    <el-progress
                      :percentage="88"
                      :show-text="false"
                      :stroke-width="4"
                    ></el-progress>
                    <span>Job Success</span>
                  </div>

                  <!-- Indicator -->
                  <div class="indicator">
                    <strong>100%</strong>
                    <el-progress
                      :percentage="100"
                      :show-text="false"
                      :stroke-width="4"
                    ></el-progress>
                    <span>Recommendation</span>
                  </div>

                  <!-- Indicator -->
                  <div class="indicator">
                    <strong>90%</strong>
                    <el-progress
                      :percentage="90"
                      :show-text="false"
                      :stroke-width="4"
                    ></el-progress>
                    <span>On Time</span>
                  </div>

                  <!-- Indicator -->
                  <div class="indicator">
                    <strong>80%</strong>
                    <el-progress
                      :percentage="80"
                      :show-text="false"
                      :stroke-width="4"
                    ></el-progress>
                    <span>On Budget</span>
                  </div>
                </div>
              </div>
            </el-card>

            <!-- Widget -->
            <el-card>
              <div class="sidebar-widget">
                <h3>
                  Skills
                  <el-button
                    class="btn-profile-edit skills"
                    @click="$router.push('/profile/set-skill')"
                    v-if="can_edit"
                    icon="el-icon-edit"
                    circle
                  ></el-button>
                </h3>
                <div class="task-tags">
                  <span v-for="skill in profile.skills" :key="skill.id">
                    {{ skill.name }}
                  </span>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Spacer -->
    <div class="margin-top-15"></div>
    <!-- Spacer / End-->

    <!-- BEGIN headline edit modal -->
    <el-dialog title="Edit Headline" :visible.sync="headlineDialog">
      <el-form>
        <el-form-item>
          <el-input
            v-model="headline"
            placeholder="Example: Frontend Developer"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="headlineDialog = false">Cancel</el-button>
        <el-button type="primary" @click="setProfileDetails">
          Save Change
        </el-button>
      </div>
    </el-dialog>
    <!-- END headline edit modal -->

    <!-- BEGIN summary edit modal -->
    <el-dialog title="Edit Summary" :visible.sync="summaryDialog">
      <el-form>
        <el-form-item>
          <el-input
            :rows="5"
            type="textarea"
            v-model="summary"
            placeholder="Write about you"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="summaryDialog = false">Cancel</el-button>
        <el-button type="primary" @click="setProfileDetails">
          Save Change
        </el-button>
      </div>
    </el-dialog>
    <!-- END summary edit modal -->

    <!-- BEGIN headline edit modal -->
    <el-dialog title="Edit Hourly Rate" :visible.sync="hourlyRateDialog">
      <el-form>
        <el-form-item>
          <el-input
            type="number"
            class="no-right-padding"
            v-model="hourly_rate"
            placeholder="Example: 40"
          >
            <template slot="prepend">$</template>
            <template slot="append">USD / hr</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="hourlyRateDialog = false">Cancel</el-button>
        <el-button type="primary" @click="setProfileDetails">
          Save Change
        </el-button>
      </div>
    </el-dialog>
    <!-- END headline edit modal -->

    <!-- BEGIN employment history add modal -->
    <el-dialog
      title="Add Employment History"
      :visible.sync="employmentHistoryAddDialog"
    >
      <el-form
        :model="employmentHistoryAddForm"
        :rules="employmentHistoryRules"
        label-position="top"
        ref="employmentHistoryAddForm"
        label-width="120px"
        class="bid-form"
      >
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="Title" prop="title">
              <el-input
                placeholder="Please input"
                v-model="employmentHistoryAddForm.title"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Company" prop="company">
              <el-input
                placeholder="Please input"
                v-model="employmentHistoryAddForm.company"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-row :gutter="10">
              <el-col :md="24" style="margin-bottom: 0"
                ><label>Start</label></el-col
              >
              <el-col :md="12">
                <el-form-item prop="start_year">
                  <el-select
                    clearable
                    v-model="employmentHistoryAddForm.start_year"
                    placeholder="Select Year"
                  >
                    <el-option
                      v-for="item in range(1900, 2001)"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="" prop="start_month">
                  <el-select
                    clearable
                    v-model="employmentHistoryAddForm.start_month"
                    placeholder="Select Month"
                  >
                    <el-option
                      v-for="item in months"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :md="12">
            <el-row :gutter="10">
              <el-col :md="24" style="margin-bottom: 0"
                ><label>End</label></el-col
              >
              <el-col :md="12">
                <el-form-item prop="end_year">
                  <el-select
                    clearable
                    v-model="employmentHistoryAddForm.end_year"
                    placeholder="Select Year"
                    :disabled="employmentHistoryAddForm.curr_working_here"
                  >
                    <el-option
                      v-for="item in range(1900, 2001)"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="" prop="end_month">
                  <el-select
                    clearable
                    v-model="employmentHistoryAddForm.end_month"
                    placeholder="Select Month"
                    :disabled="employmentHistoryAddForm.curr_working_here"
                  >
                    <el-option
                      v-for="item in months"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" style="margin-top: -35px">
                <el-checkbox
                  v-model="employmentHistoryAddForm.curr_working_here"
                  @change="onChangeWorkingHere"
                  >I'm currently working here</el-checkbox
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-form-item label="Summary" prop="summary">
          <el-input
            type="textarea"
            rows="8"
            v-model="employmentHistoryAddForm.summary"
            placeholder="Describe your work experience"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="employmentHistoryAddDialog = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="addEmploymentHistory">
          Save
        </el-button>
      </div>
    </el-dialog>
    <!-- END employment history add modal -->

    <!-- BEGIN employment history edit modal -->
    <el-dialog
      title="Edit Employment History"
      :visible.sync="employmentHistoryEditDialog"
    >
      <el-form
        :model="employmentHistoryEditForm"
        :rules="employmentHistoryRules"
        label-position="top"
        ref="employmentHistoryEditForm"
        label-width="120px"
        class="bid-form"
      >
        <el-row :gutter="20">
          <el-col :md="12">
            <el-form-item label="Title" prop="title">
              <el-input
                placeholder="Please input"
                v-model="employmentHistoryEditForm.title"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-form-item label="Company" prop="company">
              <el-input
                placeholder="Please input"
                v-model="employmentHistoryEditForm.company"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <el-row :gutter="10">
              <el-col :md="24" style="margin-bottom: 0"
                ><label>Start</label></el-col
              >
              <el-col :md="12">
                <el-form-item prop="start_year">
                  <el-select
                    clearable
                    v-model="employmentHistoryEditForm.start_year"
                    placeholder="Select Year"
                  >
                    <el-option
                      v-for="item in range(1900, 2001)"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="" prop="start_month">
                  <el-select
                    clearable
                    v-model="employmentHistoryEditForm.start_month"
                    placeholder="Select Month"
                  >
                    <el-option
                      v-for="item in months"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :md="12">
            <el-row :gutter="10">
              <el-col :md="24" style="margin-bottom: 0"
                ><label>End</label></el-col
              >
              <el-col :md="12">
                <el-form-item prop="end_year">
                  <el-select
                    clearable
                    v-model="employmentHistoryEditForm.end_year"
                    placeholder="Select Year"
                    :disabled="employmentHistoryEditForm.curr_working_here == 1"
                  >
                    <el-option
                      v-for="item in range(1900, 2001)"
                      :key="item"
                      :label="item"
                      :value="item"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="12">
                <el-form-item label="" prop="end_month">
                  <el-select
                    clearable
                    v-model="employmentHistoryEditForm.end_month"
                    placeholder="Select Month"
                    :disabled="employmentHistoryEditForm.curr_working_here == 1"
                  >
                    <el-option
                      v-for="item in months"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" style="margin-top: -35px">
                <el-checkbox
                  v-model="employmentHistoryEditForm.curr_working_here"
                  :checked="employmentHistoryEditForm.curr_working_here == 1"
                  @change="onChangeWorkingHereOnEdit"
                  >I'm currently working here</el-checkbox
                >
              </el-col>
            </el-row>
          </el-col>
        </el-row>

        <el-form-item label="Summary" prop="summary">
          <el-input
            type="textarea"
            rows="8"
            v-model="employmentHistoryEditForm.summary"
            placeholder="Describe your work experience"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="employmentHistoryEditDialog = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="editEmploymentHistory">
          Save Changes
        </el-button>
      </div>
    </el-dialog>
    <!-- END employment history edit modal -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Cropper } from 'vue-advanced-cropper'
import { uploadUrl } from '@/constants/index'
import { createHelpers } from 'vuex-map-fields'
const { mapFields } = createHelpers({
  getterType: `profile/getField`,
  mutationType: `profile/updateField`,
})

export default {
  auth: false,
  layout: 'main',
  components: {
    Cropper,
  },
  data() {
    return {
      can_edit: true,
      headlineDialog: false,
      summaryDialog: false,
      employmentHistoryAddDialog: false,
      employmentHistoryEditDialog: false,
      hourlyRateDialog: false,
      avatar_uploading: false,
      avatar_loading: true,
      edit_avatar: false,
      coordinates: {
        width: 200,
        height: 200,
        left: 0,
        top: 0,
      },
      canvas: null,
      image: '/images/profile/no-avatar.png',
      avatar: '/images/profile/no-avatar.png',
      rate: 5,
      employmentHistoryAddForm: {
        title: '',
        company: '',
        summary: '',
        start_year: '',
        start_month: '',
        end_year: '',
        end_month: '',
        curr_working_here: false,
      },
      employmentHistoryEditForm: {},
      employmentHistoryRules: {
        title: [
          {
            required: true,
            message: 'Please enter title',
            trigger: 'blur',
          },
        ],
        company: [
          {
            required: true,
            message: 'Please enter company',
            trigger: 'blur',
          },
        ],
        summary: [
          {
            required: true,
            message: 'Please enter summary',
            trigger: 'blur',
          },
        ],
        start_year: [
          {
            required: true,
            message: 'Please select year',
            trigger: 'blur',
          },
        ],
        start_month: [
          {
            required: true,
            message: 'Please select month',
            trigger: 'blur',
          },
        ],
      },
      months: [
        {
          value: '1',
          label: 'January',
        },
        {
          value: '2',
          label: 'February',
        },
        {
          value: '3',
          label: 'March',
        },
        {
          value: '4',
          label: 'April',
        },
        {
          value: '5',
          label: 'May',
        },
        {
          value: '6',
          label: 'June',
        },
        {
          value: '7',
          label: 'July',
        },
        {
          value: '8',
          label: 'August',
        },
        {
          value: '9',
          label: 'September',
        },
        {
          value: '10',
          label: 'October',
        },
        {
          value: '11',
          label: 'November',
        },
        {
          value: '12',
          label: 'December',
        },
      ],
    }
  },
  head() {
    return {
      title:
        this.profile.first_name + ' ' + this.profile.last_name + '.Profile',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description',
        },
      ],
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('profile/show', { username: params.username })
    await store.dispatch('profile/getPageDetail', { username: params.username })
    await store.dispatch('employment_histories/get')
  },
  computed: {
    ...mapState({
      profile: (state) => {
        return state.profile.data
      },
      employmentHistories: (state) => {
        return state.employment_histories.list
      },
    }),
    ...mapFields([
      'pageDetail.headline',
      'pageDetail.summary',
      'pageDetail.hourly_rate',
    ]),
  },
  beforeMount() {
    if (this.$auth.loggedIn) {
      this.can_edit = this.$auth.user.username == this.$route.params.username
    } else {
      this.can_edit = false
    }
    // if (this.profile == undefined) {
    //   this.$router.push('/browse/freelancers')
    // }
  },
  mounted() {
    console.log('profile', this.profile)
    if (this.profile.avatar) {
      this.image = '/mylancer_upload_cdn' + this.profile.avatar.path
      this.coordinates = this.profile.avatar.coordinates
    }
  },
  methods: {
    setProfileDetails() {
      this.headlineDialog = false
      this.hourlyRateDialog = false
      this.summaryDialog = false
      this.$store.dispatch('profile/setPageDetail', {
        username: this.$route.params.username,
      })
    },
    addEmploymentHistory() {
      this.$refs['employmentHistoryAddForm'].validate((valid) => {
        if (valid) {
          console.log(
            'this.employmentHistoryAddForm',
            this.employmentHistoryAddForm
          )
          this.$store
            .dispatch(
              'employment_histories/create',
              this.employmentHistoryAddForm
            )
            .then((res) => {
              this.employmentHistoryAddDialog = false
              this.$store.dispatch('employment_histories/add', res.data.created)
            })
        }
      })
    },
    openHistoryEditModal(history_id) {
      const history = this.employmentHistories.find((h) => h.id === history_id)
      // this.employmentHistoryEditForm.start_month = this.months[
      //   this.employmentHistoryEditForm.start_month - 1
      // ]
      this.employmentHistoryEditForm = { ...history }
      this.employmentHistoryEditDialog = true
    },
    editEmploymentHistory() {
      this.$refs['employmentHistoryEditForm'].validate((valid) => {
        if (valid) {
          console.log(
            'this.employmentHistoryEditForm',
            this.employmentHistoryEditForm
          )
          this.$store
            .dispatch(
              'employment_histories/update',
              this.employmentHistoryEditForm
            )
            .then((res) => {
              this.employmentHistoryEditDialog = false
              this.$store.commit('employment_histories/set', res.data.histories)
            })
        }
      })
    },
    deleteEmploymentHistory(history_id) {
      this.$store
        .dispatch('employment_histories/delete', history_id)
        .then((res) => {
          this.employmentHistoryEditDialog = false
          this.$store.dispatch('employment_histories/get')
        })
    },
    onChangeWorkingHere() {
      if (this.employmentHistoryAddForm.curr_working_here) {
        this.employmentHistoryAddForm.end_year = ''
        this.employmentHistoryAddForm.end_month = ''
      }
    },
    onChangeWorkingHereOnEdit() {
      if (this.employmentHistoryEditForm.curr_working_here) {
        this.employmentHistoryEditForm.end_year = ''
        this.employmentHistoryEditForm.end_month = ''
      }
    },
    range(start, end) {
      return Array(end - start + 1)
        .fill()
        .map((_, idx) => end - idx)
    },
    // Begin Avatar Handling
    uploadAvatar() {
      let avatar = this.$refs.avatar_file.files[0]
      const form = new FormData()
      form.append('avatar', avatar)
      form.append('avatar_base64', this.canvas.toDataURL('image/png'))
      form.append('coordinates', JSON.stringify(this.coordinates))
      this.avatar_uploading = true
      this.$store
        .dispatch('profile/uploadAvatar', form)
        .then((res) => {
          this.avatar_uploading = false
          this.edit_avatar = false
        })
        .catch((err) => {
          this.avatar_uploading = false
          console.log(err)
        })
    },
    onChange({ coordinates, canvas }) {
      // return
      // if (!canvas) return
      this.avatar = canvas.toDataURL('image/png')
      this.avatar_loading = false

      this.canvas = canvas
      this.coordinates = coordinates
      console.log(coordinates)
    },
    selectImage(event) {
      console.log(event)
      // Reference to the DOM input element
      var input = event.target
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader()
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.image = e.target.result
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0])
      }
    },
    pixelsRestriction({
      minWidth,
      minHeight,
      maxWidth,
      maxHeight,
      imageWidth,
      imageHeight,
    }) {
      return {
        minWidth: minWidth,
        minHeight: minHeight,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
      }
    },
    defaultPosition() {
      return {
        left: this.coordinates.left,
        top: this.coordinates.top,
      }
    },
    defaultSize() {
      return {
        width: this.coordinates.width,
        height: this.coordinates.height,
      }
    },
    // End Avatar Handling
  },
}
</script>

<style lang="scss">
#user-profile-page {
  .btn-profile-edit {
    position: absolute;
    padding: 6px;
    margin-left: 0px;
    margin-top: -15px;
    i {
      color: var(--color-primary);
      font-weight: bold;
      font-size: 18px;
    }

    &.avatar {
      margin-left: 165px;
      margin-top: 0px;
      padding: 15px;
      i {
        font-size: 20px;
      }
    }
    &.headline {
      margin-left: 3px;
      margin-top: -4px;
    }
    &.description {
      float: right;
      position: relative;
      top: 0;
    }
    &.skills {
      float: right;
      position: relative;
      margin-top: -10px;
    }
    &.employment-history {
      position: relative;
      margin-top: -30px;
    }
  }
  > .container .el-card {
    margin-bottom: 20px;
  }
  .freelancer-header {
    margin-bottom: 20px;
    padding: 70px 0;

    .header-image {
      width: 200px;
      height: 200px;
      flex: none;
    }
  }
  .single-page-section {
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .freelancer-indicators {
    .el-progress {
      margin: 10px 0;
    }
  }
  .review-rate {
    top: -5px;
    position: relative;
    i {
      font-size: 25px !important;
    }
  }

  .employment-history-list .boxed-list-item {
    justify-content: space-between;
  }
  .task-tags {
    // margin: 5px 0 3px 0;
    span {
      margin: 4px 4px;
      padding: 4px 16px;
      // display: block;
    }
  }
}
.upload-avatar {
  position: absolute;
  left: 220px;
  top: -23px;
  padding: 30px 20px;
  width: 400px;
  background: white;
  border: 1px solid lightgray;
  border-radius: 5px;
  z-index: 10000;

  .close {
    position: absolute;
    font-size: 25px;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  .upload-avatar-cropper {
    border: solid 1px #eee;
    height: 300px;
    width: 100%;
  }
  .button-wrapper {
    margin-top: 17px;

    > button {
      width: 100%;
      & + .el-button {
        margin-left: 0;
        margin-top: 10px;
      }
    }
    input {
      display: none;
    }
  }
}
</style>
