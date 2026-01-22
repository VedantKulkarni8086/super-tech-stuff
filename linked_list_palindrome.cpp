#include<iostream>
#include<iomanip>
#include<thread>
#include<typeinfo>
#include<cstring>
#include<bits/stdc++.h>
#include<string>
#include<math.h>
#include<cmath>
#include<cstdlib>
#include<algorithm>
#include<vector>
#include<exception>
#include<stdexcept>
#include<fstream>
using namespace std;
class Node {
public:
    int data;
    Node* next;
    Node(int val) {
        data = val;
        next = NULL;
    }
};
void printList(Node* head) {
    Node* temp = head;
    while (temp->next != NULL) {
        cout << temp->data << "->";
        temp = temp->next;
    }
    cout << temp->data << endl;
}
void PalindromeChecking(Node* head) {
    Node* temp = head;
    stack<int> values;
    while (temp != NULL) {
        values.push(temp->data);
        temp = temp->next;
    }
    temp = head;
    bool isPalindrome = true;
    while (temp != NULL) {
        int topValue = values.top();
        values.pop();
        if (temp->data != topValue) {
            isPalindrome = false;
            break;
        }
        temp = temp->next;
    }
    if (isPalindrome) {
        cout << "true it is palindrome." << endl;
    } else {
        cout << "false it is not palindrome." << endl;
    }
}
int main() {
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(2);
    head->next->next->next->next = new Node(1);
    printList(head);
    PalindromeChecking(head);
    return 0;
}