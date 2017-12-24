export default {
  methods: {
    Sigmoid: function(x)
    {
      var result = new Array();
      for(var i in x)
        result.push(1 / (1 + this.math.exp(-x[i])));
      return result
    },
    Classify: function(index)
    {
      var Z = new Array();

      for(var key in this.dataset)
      {
        if(key != "Class" & key != "Description")
          Z.push(this.dataset[key][index]);
      }
      Z.push(1);
      for(var layer = 0; layer < this.weights.length; layer++)
      {
        var S = this.math.multiply(Z, this.math.transpose(this.weights[layer]));
        Z = this.Sigmoid(S);
        Z.push(1);
      }

      Z.pop();
      var x = 0;
      while(x < Z.length)
      {
        Z[x] = Z[x].toFixed(0);
        x++
      }
      document.getElementById( "class"+index ).textContent = Z;
      document.getElementById( "class"+index ).style.visibility = "visible";
      document.getElementById( "button"+index ).hidden = true;
    },
    LoadDataD: function() { this.LoadData(this.url_d, this.ToDataset); },
    LoadDataW: function() { this.LoadData(this.url_w, this.ToWeights); },
    LoadData: function(url, callback)
    {
      this.info = "Requesting ...";
      var rq = new XMLHttpRequest();

      rq.onreadystatechange = function(vm)
      {
        if (this.readyState === XMLHttpRequest.DONE)
        {
          if (this.status === 200)
          {
            vm.json_obj = JSON.parse( this.responseText );
            callback();
            vm.info = "Success";
          }
          else { vm.info = "Request Failed"; }
        }
      }.bind(rq, this);

      rq.open("GET", url);
      rq.send();
    },
    ToWeights: function()
    {
      this.weights = new Array();
      for (var key1 in this.json_obj)
      {
        if (this.json_obj.hasOwnProperty(key1) & key1 != "input" & key1 != "output" & key1 != "hidden" & key1 != "layers")
        {
          var temporalmatrix = new Array();
          for (var key2 in this.json_obj[key1])
            temporalmatrix.push(this.json_obj[key1][key2]);
          this.weights.push(temporalmatrix);
        }
      }
      this.DrawNeuralNetwork();
    },
    ToDataset: function()
    {
      this.dataset = this.json_obj;
      document.getElementById( "description" ).style.visibility = "visible";
      document.getElementById( "dataset_char" ).textContent = this.dataset["Description"]["Data Set Characteristics"];
      document.getElementById( "attribute" ).textContent = this.dataset["Description"]["Attribute Characteristics"];
      document.getElementById( "associated" ).textContent = this.dataset["Description"]["Associated Tasks"];
      document.getElementById( "instances" ).textContent = this.dataset["Description"]["Number of Instances"];
      document.getElementById( "attributes" ).textContent = this.dataset["Description"]["Number of Attributes"];
      document.getElementById( "notes" ).textContent = this.dataset["Description"]["Notes"];
    }
  }
}
