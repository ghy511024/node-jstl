class Visitor {

    doVisit(node) {

    }

    visitBody(node) {
        if (node.getBody() != null) {
            node.getBody().visit(this)
        }
    }

    visit(node) {
        console.log("父类得 visit")
        this.doVisit(node);
        this.visit(node);

    }
}

module.exports = Visitor;