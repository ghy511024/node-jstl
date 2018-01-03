var esprima = require('esprima');

class excute {
    constructor(ctx) {
        this.ctx = ctx;

    }

    excute(program) {
        // let program = 'a>b&&c==0';

        let ast = esprima.parse(program);
        console.log(JSON.stringify(ast))
        let astBody = ast.body || [];
        if (astBody.length > 0) {
            let expression = astBody[0].expression;
            // console.log(expression, this.ctx)
            var val = this.getvalue(expression, this.ctx);
            console.log(val)
        }

    }

    getvalue(node, ctx) {
        ctx = ctx || this.ctx;
        let type = node.type;
        let value;
        switch (type) {
            case "ThisExpression":
                break;
            case "Identifier":
                value = this.getIdentifier(node, ctx);
                break;
            case "Literal":
                break;
            case "ArrayExpression":
                break;
            case "ObjectExpression":
                break;
            case "FunctionExpression":
                break;
            case "ArrowFunctionExpression":
                break;
            case "ClassExpression":
                break;
            case "TaggedTemplateExpression":
                break;
            case "MemberExpression":
                value = this.getMemberExpression(node, ctx);
                break;
            case "Super":
                break;
            case "MetaProperty":
                break;
            case "NewExpression":
                break;
            case "CallExpression":
                break;
            case "UpdateExpression":
                break;
            case "AwaitExpression":
                break;
            case "UnaryExpression":
                break;
            case "BinaryExpression":
                break;
            case "LogicalExpression":
                value = this.getLogicalExpression(node, ctx);
                break;
            case "ConditionalExpression":
                break;
            case "YieldExpression":
                break;
            case "AssignmentExpression":
                break;
            case "BinaryExpression":
                break;
            case "SequenceExpression":

                break;
            default:
                break;
        }
        return value;
    }

    getIdentifier(node, ctx) {
        let idname = node.name;
        // console.log("Identifier", idname, ctx)
        return ctx[idname]
    }

    getMemberExpression(node, ctx) {
        let object = node.object;
        let property = node.property;
        let computed = node.computed;// 暂时没用到
        let object_val = this.getvalue(object, ctx);
        let property_val = this.getvalue(property, object_val);
        return property_val;
    }

    getBinaryExpression(node, ctx) {
        let left = node.left;
        let right = node.right;
        let left_val = this.getvalue(left, ctx);
        let right_val = this.getvalue(right, ctx);
        let operator = node.operator;

        let value;
        switch (operator) {
            case "instanceof":
                value = left_val instanceof right_val;
                break;
            case "in":
                value = left_val in right_val;
            case "+":
                value = left_val + right_val;
            case "-":
                value = left_val - right_val;
            case "*":
                value = left_val * right_val;
            case "/":
                value = left_val / right_val;
            case "%":
                value = left_val % right_val;
            case "**":
                value = left_val ** right_val;
            case "|":
                value = left_val | right_val;
            case "^":
                value = left_val ^ right_val;
            case "&":
                value = left_val & right_val;
            case "<<":
                value = left_val << right_val;
            case "==":
                value = left_val == right_val;
            case "!=":
                value = left_val != right_val;
            case "===":
                value = left_val === right_val;
            case "!==":
                value = left_val !== right_val;
            case "<":
                value = left_val < right_val;
            case "<=":
                value = left_val <= right_val;
            case ">":
                value = left_val > right_val;
            case ">=":
                value = left_val >= right_val;
            case "<<":
                value = left_val << right_val;
            case ">>":
                value = left_val >> right_val;
            case ">>>":
                value = left_val >>> right_val;
                break;
            default:
                break;
        }
        return value;
    }

    getLogicalExpression(node) {
        let left = node.left;
        let right = node.right;
        let left_val = this.getvalue(left);
        let right_val = this.getvalue(right);
        let operator = node.operator;
        let value;
        switch (operator) {
            case "||":
                value = left_val || right_val;
                break;
            case "&&":
                value = left_val && right_val;
                break;
            default:
                break;
        }
        return value;
    }
}

module.exports = excute;