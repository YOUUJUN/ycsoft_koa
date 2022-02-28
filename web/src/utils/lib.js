import axios from './http';
import editormd from "editor.md/editormd.min";
import editormdconfig from "./editor.md";
import common from "./common";
import config from "./config";

var Rxport = {
    axios,
    editormd,
    editormdconfig,
    common,
    config
};

export default Rxport;