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
    string s1,s2;
    cin >> s1 >> s2;
    int count = 0;
    for(int i =0;i < s2.length();i++) {
        if(s1[count] == s2[i]) {
            count++;
        }
    }
    cout << count + 1 << endl;
    return 0;
}