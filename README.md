# Neoscan - Reloaded

A Neocron Log Parser that shows the damage you take and resistance breakdown.

![neocron-reloaded](/assets/neoscan-reloaded.gif)

## How to get this up and running

1. Enable logging by adding `ENABLELOG="TRUE"` to your neocron.ini file
2. Copy `neoscan-reloaded.exe` into the Neocron game folder.
3. Start the application
4. Follow the prompts

## Two Modes

There are two modes that you can choose.

-   `Real-Time`: This mode will watch your logs in real-time and only output new damage.
-   `Scan an Existing Log File`: This mode will scan an existing log file and output all damage.

## A Few Notes

Since this is meant to be ran within a Windows environment, you will need to open up a command prompt window **FIRST** if you want to run the `Scan` mode. This is because the window will close automatically after the program runs.

If you only want to run in `Real-Time` mode, you can simply double-click on the application to run it.
