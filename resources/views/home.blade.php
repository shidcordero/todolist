<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8" /> 
        <title>Todolist</title>
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
        @if (env('APP_PROD'))
            <link href="{{ url('/assets/bundle.css') }}" rel="stylesheet">
        @endif
    </head>
    <body>
        <div id="root"></div>
        @if (env('APP_PROD'))
            <script src="{{ url('/assets/bundle.js') }}"></script>
        @else
            <script src="http://localhost:8081/bundle.js"></script>
        @endif
    </body>
</html>
