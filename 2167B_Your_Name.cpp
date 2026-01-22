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

int main() {
    int t;
    cin >> t;
    while(t--) {
        int n;
        string s,t;
        cin >> n;
        cin >> s >> t;
        map<char,int> m;
        for(int i = 0;i < n;i++) {
            m[s[i]]++;
            m[t[i]]--;
        }
        bool IsTrue = true;
        for(auto it : m) {
            if(it.second != 0) {
                IsTrue = false;
                break;
            }
        }
        if(IsTrue) {
            cout << "YES" << endl;
        } else {
            cout << "NO" << endl;
        }
    }
    return 0;
}