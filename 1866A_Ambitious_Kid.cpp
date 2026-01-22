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
    int n;
    cin >> n;
    int* arr = new int[n];
    int ans = INT_MAX;
    for(int i =0;i < n;i++) {
        cin >> arr[i];
        ans = min(arr[i] < 0 ? arr[i] * -1 : arr[i],ans);
    }
    cout << ans << endl;
    delete[] arr;
    return 0;
}