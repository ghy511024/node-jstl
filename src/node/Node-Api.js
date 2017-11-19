const Node = require("./Node");
const CustomTag = require("./CustomTag");
const TemplateText = require("./TemplateText");
const Nodes = require("./Nodes");
const Root = require("./Root");

Node.CustomTag = CustomTag;
Node.TemplateText = TemplateText;
Node.Nodes = Nodes;
Node.Root = Root;

module.exports = Node;