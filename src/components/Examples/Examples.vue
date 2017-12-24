<template>
  <div class="container_game">
    <div style="width: 31%;">
      <div style="margin-top:1%;">
        <button type="button" class="btn btn-dark" v-on:click="SetIris">Load Iris Example</button>
      </div>
      <div style="margin-top:1%; margin-bottom:2%;">
        <button type="button" class="btn btn-dark" v-on:click="SetIris">Load Iris Example</button>
      </div>
      </div>
      <div class="table-wrapper" style="width: 27%; float:left" v-if="dataset != 'No dataset'">
        <div class="table-scroll">
          <table border="1" cellpadding="10">
            <tbody id="dataset">
              <tr v-for="(value2, index2) in dataset['Class']">
                <td v-for="(value3, key3, index3) in dataset" v-if="key3 != 'Class' & key3 != 'Description'">
                  <p>{{ value3[index2] }}</p>
                </td>
                <td>
                  <p :id="'class' + index2" style="visibility: hidden;"></p>
                  <input class="btn btn-dark" :id="'button' + index2" type="button" value="Classify" v-on:click="Classify(index2)" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="summary" id="description" style="width: 27%;">
        <span style="font-weight: bold;">Data Set Characteristics</span><br/>
        <span id = "dataset_char"></span><br/>
        <span style="font-weight: bold;">Attribute Characteristics</span><br/>
        <span id = "attribute"></span><br/>
        <span style="font-weight: bold;">Associated Tasks</span><br/>
        <span id = "associated"></span><br/>
        <span style="font-weight: bold;">Number of Instances</span><br/>
        <span id = "instances"></span><br/>
        <span style="font-weight: bold;">Number of Attributes</span><br/>
        <span id = "attributes"></span><br/>
        <span style="font-weight: bold;">Notes</span><br/>
        <span id = "notes"></span>
      </div>
      <div style="width: 46%; float:left;">
        <svg width="600" height="400"></svg>
      </div>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import ffnn from "./FFNN.js";
import graphics from "./Graphics.js";

export default {
  mixins:[ffnn, graphics],
  data () {
    return {
      math:require('mathjs'),
      url_w:'',
      url_d:'',
      json_obj:'',
      info:'coso',
      weights:'No weights',
      dataset:'No dataset'
    }
  },
  methods: {
    SetIris: function() {
      this.url_w = "https://gist.githubusercontent.com/cesandovalp/4a19c308c5e9bf2adc0172edd6e9c72f/raw/2d6a902ee677bbcfe0479869e2c206d0dd91a9d0/weights.json",
      this.url_d = "https://gist.githubusercontent.com/cesandovalp/4a19c308c5e9bf2adc0172edd6e9c72f/raw/b3dcb57960c17cf8e52c27ec27209c84faad4083/iris.json";
      this.LoadDataD();
      this.LoadDataW();
    }
  }
}
</script>
