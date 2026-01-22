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
        if(n % 4 == 0) {
            cout << "YES" << endl;
            int sum = 0;
            for(int i = 2;i <=n;i += 2) {
                cout << i << " ";
                sum += i;
            }
            int x = 1,ex_sum = 0;

            for(int i = 1;i <= n/2-1;i++) {
                cout << x << " ";
                ex_sum += x;
                x += 2;

            }
            cout << sum - ex_sum << endl;
        } else cout << "NO" << endl;
    }
    
    return 0;
}