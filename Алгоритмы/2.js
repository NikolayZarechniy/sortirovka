class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  insert(value) {
    const newNode = new TreeNode(value);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
  inOrderTraversal(node = this.root, result = []) {
    if (node) {
      this.inOrderTraversal(node.left, result);
      result.push(node.value);
      this.inOrderTraversal(node.right, result);
    }
    return result;
  }

  getAt(index) {
    let count = 0;
    let targetNode = null;

    function inorder(node) {
      if (!node || targetNode !== null) return;
      inorder(node.left);
      if (count === index) {
        targetNode = node;
        count++;
        return;
      }
      count++;
      inorder(node.right);
    }

    inorder(this.root);
    return targetNode ? targetNode.value : null;
  }
}
const nodes = [17, 6, 5, 20, 19, 18, 11, 14, 12, 13, 2, 4, 10];
[span_7](start_span)[span_7](end_span);
const bst = new BinarySearchTree();
nodes.forEach((val) => bst.insert(val));

console.log("In-order обход:", bst.inOrderTraversal());
console.log("0-й элемент:", bst.getAt(0)); // 2
console.log("5-й элемент:", bst.getAt(5)); // 11
