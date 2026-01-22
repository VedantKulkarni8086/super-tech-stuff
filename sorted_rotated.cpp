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

int keyfinding(vector<int> arr,int key) {
    for(int i = 0;i < arr.size();i++) {
        if(arr[i] == key) {
            return i;
        }
    }
    return -1;
}
int main() {
    vector<int> arr;
    int n;
    cin >> n;
    for(int i =0;i < n;i++) {
        int val;
        cin >> val;
        arr.push_back(val);
    }
    int key;
    cin >> key;
    int answer = keyfinding(arr,key);
    cout << ((answer == -1)? "key not present" : "key is present at index " + to_string(answer)) << endl;
    return 0;
}