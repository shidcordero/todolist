<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;

class SetPasswordGrantClientCredentialsToEnv extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:copy-grant-credentials';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Set oauth password grant client credentials for .env file';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->setEnvironmentValue('OAUTH_CLIENT_SECRET', DB::table('oauth_clients')->find(2)->secret);
    }

    /**
     * Set .env values. From: https://stackoverflow.com/a/46396076
     *
     * @return null
     */
    private function setEnvironmentValue($envKey, $envValue)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);

        $str .= "\n"; // In case the searched variable is in the last line without \n
        $keyPosition = strpos($str, "{$envKey}=");
        $endOfLinePosition = strpos($str, PHP_EOL, $keyPosition);
        $oldLine = substr($str, $keyPosition, $endOfLinePosition - $keyPosition);
        $str = str_replace($oldLine, "{$envKey}={$envValue}", $str);
        $str = substr($str, 0, -1);

        $fp = fopen($envFile, 'w');
        fwrite($fp, $str);
        fclose($fp);
    }

}
