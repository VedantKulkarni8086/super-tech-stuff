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
        cin >> n;
        int* arr = new int[n];
        long double mul = 1;
        for(int i =0;i < n;i++) {
            cin >> arr[i];
            mul *= arr[i];
        }
        long double target = 1;
        bool flag = false;
        for(int i =0;i < n;i++) {
            target *= arr[i];
            if(target == mul/target)  {
                cout << i + 1 << endl;
                flag = true;
                break;
            }
        }
        if(!flag) cout << -1 << endl;
        delete[] arr;
    }
    return 0;
}