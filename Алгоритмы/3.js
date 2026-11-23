class AVLTreeALG{
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    return node ? node.height : 0;
  }

  getBalanceFactor(node) {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  updateHeight(node) {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  rotateRight(y) {
    const x = y.left;
    const T2 = x.right;
    x.right = y;
    y.left = T2;
    this.updateHeight(y);
    this.updateHeight(x);
    return x;
  }

  rotateLeft(x) {
    const y = x.right;
    const T2 = y.left;
    y.left = x;
    x.right = T2;
    this.updateHeight(x);
    this.updateHeight(y);
    return y;
  }

  insert(node, value) {
    if (!node) return new AVLTreeNode(value);

    if (value < node.value) {
      node.left = this.insert(node.left, value);
    } else if (value > node.value) {
      node.right = this.insert(node.right, value);
    } else {
      return node;
    }

    this.updateHeight(node);
    const balance = this.getBalanceFactor(node);

    if (balance > 1 && value < node.left.value) return this.rotateRight(node);
    if (balance < -1 && value > node.right.value) return this.rotateLeft(node);
    if (balance > 1 && value > node.left.value) {
      node.left = this.rotateLeft(node.left);
      return this.rotateRight(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rotateRight(node.right);
      return this.rotateLeft(node);
    }

    return node;
  }
}
