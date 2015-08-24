(function() {
	'use strict';

	angular.module("sharedServices").factory('ContactList', [function(){
		
		var BLACK = 0;
		var RED   = 1;


		function Node (key, color) {
			this.color = color;
			if (key) {
				this.key = {
					name: key.name,
					phone: key.phone,
					email: key.email
				};
			}
			else {
				this.key = null;
			}
			this.parent = null;
			this.left = null;
			this.right = null;
		};

		Node.prototype.isEqualNode = function (node) {
			var element = node.key,
				that = this.key;

			if (!element && !that) return true; // if leaf
			if (!element || !that) return false; // if one of nodes is leaf
	
			if (that.name.toLowerCase() === element.name.toLowerCase() && that.phone.toLowerCase() === element.phone.toLowerCase() && that.email.toLowerCase() === element.email.toLowerCase()) {
				return true;
			}
			return false;
		};

		Node.prototype.isEqualValue = function (value) {
			var that = this.key;

			if (that.name.toLowerCase() === value.name.toLowerCase() && that.phone.toLowerCase() === value.phone.toLowerCase() && that.email.toLowerCase() === value.email.toLowerCase()) {
				return true;
			}
			return false;
		};

		Node.prototype.compareWithNode = function (node) {
			var element = node.key,
				that = this.key;

			if (!element && !that) return true; //if leaf
			if (!element || !that) return false; // if one of nodes is leaf
			if (element.name.toLowerCase() === that.name.toLowerCase()) {
					if (element.phone.toLowerCase() === this.key.phone.toLowerCase()) {
						return (element.email.toLowerCase() < that.email.toLowerCase()) ? true : false;
					}
					
					return (element.phone.toLowerCase() < that.phone.toLowerCase()) ? true : false;
			}
			
			return (element.name.toLowerCase() < that.name.toLowerCase()) ? true : false;

		};

		Node.prototype.compareWithValue = function (value) {
			var that = this.key;

			if (value.name.toLowerCase() === that.name.toLowerCase()) {
					if (value.phone.toLowerCase() === that.phone.toLowerCase()) {
						return (value.email.toLowerCase() < that.email.toLowerCase()) ? true : false;
					}
					return (value.phone.toLowerCase() < that.phone.toLowerCase()) ? true : false;

				
			}
			
			return (value.name.toLowerCase() < that.name.toLowerCase()) ? true : false;
			
		};

		function RBTree () {
			this.root = null;
		};

		RBTree.prototype.toArray = function (array, tree) {
			if (!tree) return array;
			if (tree.left || tree.right) {
				this.toArray(array, tree.left);
				array.push(tree.key);
				this.toArray(array, tree.right);
			}
			return array;
		}

		RBTree.prototype.insertBinary = function (value) {
			var root = this.root;
			var currentNode = root;
			var newNode = new Node(value, RED);
			var parent = null;

			if (!root) {
				this.root = new Node(value, BLACK);  //set root Node
				return this.root;
			}

			while (currentNode.left || currentNode.right) { 	//traversing tree to leaf
				parent = currentNode;

				if (currentNode.compareWithValue(value)) {
					currentNode = currentNode.left;
				}
				else {
					currentNode = currentNode.right;
				}
			}

			newNode.parent = parent; //set parent to new Node

			if (parent.compareWithValue(value)){ 	//set parent refs
				parent.left = newNode;
			}
			else {
				parent.right = newNode;
			}

			return newNode;

		};

		RBTree.prototype.leftRotate = function (node) { // X - node, Y - rotating node
			var rotatingNode = node.right;  //choose node to rotate (right child of X)

			node.right = rotatingNode.left; //left subTree of Y becomes right subTree of X

			if (rotatingNode.left) {
				rotatingNode.left.parent = node; //change parent ref of left subTree of Y
			}

			rotatingNode.parent = node.parent; //parent of X becomes parent of Y

			if (!node.parent) {
				this.root = rotatingNode; //if parent of X = root => Y becomes a root
			}
			else {						 // change parents of Y

				if (node.isEqualNode(node.parent.left)){
					node.parent.left = rotatingNode;
				}
				else {
					node.parent.right = rotatingNode;
				}
			}

			rotatingNode.left = node; // X becomes child of Y
			node.parent = rotatingNode;

		};

		RBTree.prototype.rightRotate = function (node) { // Y - node, X - rotating node
			var rotatingNode = node.left;	//choose node to rotate (left child of Y)

			node.left = rotatingNode.right; //right subTree of X becomes left subTree of Y

			if (rotatingNode.right) {
				rotatingNode.right.parent = node; //change parent ref of right subTree of X
			}

			rotatingNode.parent = node.parent; //parent of Y becomes parent of X

			if (!node.parent) {
				this.root = rotatingNode; //if parent of Y = root => X becomes a root
			}
			else {						 // change parents of X

				if (node.isEqualNode(node.parent.left)){
					node.parent.left = rotatingNode;
				}
				else {
					node.parent.right = rotatingNode;
				}
			}

			rotatingNode.right = node; // Y becomes child of X
			node.parent = rotatingNode;
		}

		RBTree.prototype.insert = function (value) {
			var newNode = this.insertBinary(value); //condition depends on color of patent's sibling
			var grandfather; 
			var sibling;
			var leaf = new Node(undefined, BLACK);

			newNode.left = leaf;
			newNode.right = leaf;
			
			while (!newNode.isEqualNode(this.root) && (newNode.parent.color === RED)) {
				grandfather = newNode.parent.parent;

				if (newNode.parent.isEqualNode(grandfather.left)) { //difine parent's position

					sibling = grandfather.right;
					if (sibling && sibling.color === RED) { //recolor (1 condition)
						newNode.parent.color = BLACK;
						sibling.color = BLACK;
						grandfather.color = RED;
						newNode = grandfather; // while
					}
					else {
						if (newNode.isEqualNode(newNode.parent.right))  {
							newNode = newNode.parent;  // 2 condition
							this.leftRotate(newNode);
							grandfather = newNode.parent.parent;
						}
						newNode.parent.color = BLACK; // 3 condition
						grandfather.color = RED;
						this.rightRotate(grandfather);
					}

				}
				else {

					if (newNode.parent.isEqualNode(grandfather.right)) {
						sibling = grandfather.left;
						if (sibling && sibling.color === RED) { //recolor (1 condition)
							newNode.parent.color = BLACK;
							sibling.color = BLACK;
							grandfather.color = RED;
							newNode = grandfather; // while
						}
						else {
							if (newNode.isEqualNode(newNode.parent.left))  {
								newNode = newNode.parent;  // 2 condition
								this.rightRotate(newNode);
								grandfather = newNode.parent.parent;
							}
							newNode.parent.color = BLACK; // 3 condition
							grandfather.color = RED;
							this.leftRotate(grandfather);
						}

					}

				}

			}

			this.root.color = BLACK;

			return this;
		};

		RBTree.prototype.search = function (value) {
			var currentNode = this.root;

			while (currentNode.left || currentNode.right) {

				if (currentNode.isEqualValue(value)) {
					return currentNode;
				}

				if (currentNode.compareWithValue(value)) {
					currentNode = currentNode.left;
				}
				else {
					currentNode = currentNode.right;
				}
			}

			return currentNode;
		};

		RBTree.prototype.minimum = function (node) {

			while (node.left.left) {
				node = node.left;
			}

			return node;
		};

		RBTree.prototype.maximum = function (node) {

			while (node.right.right) {
				node = node.right;
			}

			return node;
		};

		RBTree.prototype.getChild = function (node) {
			var searchNode;

			if (node.right.right) { //if node has right subtree minimum element is last in left subtree node.right
				return this.minimum(node.right);
			}

			searchNode = node.parent; //if node hasn't right subtree
			while ((searchNode.left || searchNode.right) && node.compareWithNode(searchNode.right)) {
				node = searchNode;
				searchNode = searchNode.parent;
			}

			return searchNode;
		};

		RBTree.prototype.checkBalance = function (node) {
			var sibling, parent;
			while (!node.isEqualNode(this.root) && node.color === BLACK) {
				parent = node.parent;
				if (node.compareWithNode(parent.left)) {
					sibling = parent.right;
					if (sibling.color === RED) { //1 case
						sibling.color = BLACK;
						parent.color = RED;
						this.leftRotate(parent);
						sibling = parent.right;
					}

					if (sibling.left.color === BLACK && sibling.right.color === BLACK) { //2 case
						sibling.color = RED;
						node = node.parent;
					}
					else {
						if (sibling.right.color === BLACK) {  //3 case
							sibling.left.color = BLACK;
							sibling.color = RED;
							this.rightRotate(sibling);
							sibling = parent.right;
						}
						sibling.color = parent.color;  //case 4
						parent.color = BLACK;
						sibling.right.color = BLACK;
						this.leftRotate(parent);
						node = this.root;

					}

				}
				else {
					sibling = parent.left;
					if (sibling.color === RED) { //1 case
						sibling.color = BLACK;
						parent.color = RED;
						this.rightRotate(parent);
						sibling = parent.left;
					}

					if (sibling.left.color === BLACK && sibling.right.color === BLACK) { //2 case
						sibling.color = RED;
						node = node.parent;
					}
					else {
						if (sibling.left.color === BLACK) {  //3 case
							sibling.right.color = BLACK;
							sibling.color = RED;
							this.leftRotate(sibling);
							sibling = parent.left;
						}
						sibling.color = parent.color;  //case 4
						parent.color = BLACK;
						sibling.left.color = BLACK;
						this.rightRotate(parent);
						node = this.root;

					}

				}
			}

			node.color = BLACK;

		};

		RBTree.prototype.remove = function (removedNode) {
			var nextNode, child, parent;
			var leaf = new Node(undefined, BLACK);
			if (!removedNode) return;

			if (!removedNode.left.left || !removedNode.right.right) {  //determine removed node
				nextNode = removedNode;	// if removed node hasn't children
			}
			else {
				nextNode = this.getChild(removedNode); // right delete return min node in left subtree
			}


			if (nextNode.left.left) { //save ref to removed node children
				child = nextNode.left;
			}
			else {
				child = nextNode.right;
			}


			child.parent = nextNode.parent; // change child ref
			
			if (!nextNode.parent){ //if root else child=nil, borderline cases
				this.root = child;
			} 
			else {
				parent = nextNode.parent;

				if (nextNode.isEqualNode(parent.left)) {  //change parent ref
					parent.left = child;
				}
				else {
					parent.right = child;
				}
			}

			if (!nextNode.isEqualNode(removedNode)) {
				removedNode.key = nextNode.key;
			}

			if (nextNode.color === BLACK) {
				this.checkBalance(child);
			}

			return this;
		};

		return new RBTree();

	}]);

})();