Parse.initialize("cXEt7itB1rv0h4xG7Xeu3XtvbXSKWND3rjemFPHc", "mpi9Pndokhow5Oc6GKRdVXdsbKEmsVxoy5c4Beml");



var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}, {
  success: function(object) {
		console.log(testObject)
  }
});
