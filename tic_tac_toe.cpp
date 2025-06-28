#include <iostream>
#include <vector>
#include <sstream>
using namespace std;

string check_winner(vector<string>& board) {
    int win[8][3] = {
        {0,1,2},{3,4,5},{6,7,8},
        {0,3,6},{1,4,7},{2,5,8},
        {0,4,8},{2,4,6}
    };

    for (auto& w : win) {
        if (board[w[0]] != "" && board[w[0]] == board[w[1]] && board[w[1]] == board[w[2]]) {
            return board[w[0]];
        }
    }
    for (auto& cell : board) {
        if (cell == "") return "none";
    }
    return "draw";
}

int main(int argc, char* argv[]) {
    if (argc != 2) return 1;
    string input = argv[1];
    vector<string> board;
    stringstream ss(input);
    string cell;
    while (getline(ss, cell, ',')) {
        board.push_back(cell);
    }
    cout << check_winner(board);
    return 0;
}
