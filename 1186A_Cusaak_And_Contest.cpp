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
    int n,m,k;
    cin >> n >> m >> k;
    if(m >= n && k >= n) {
        cout << "Yes" << endl;
    } else {
        cout << "No" << endl;
    }
    return 0;
}