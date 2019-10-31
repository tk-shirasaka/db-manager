<?php

namespace App\Http\Controllers;

class GroupController extends Controller
{
    public function index()
    {
        $path = storage_path('groups.json');
        return file_exists($path)
            ? json_decode(file_get_contents($path), true) : [];
    }

    public function select($no)
    {
        $sourcePath = $this->databasePath($no);
        $source = file_exists($sourcePath) ? file_get_contents($sourcePath) : '[]';
        $groups = collect($this->index())->map(function($group, $i) use ($no) {
            if ($group['select']) {
                rename($this->databasePath(), $this->databasePath($i));
            }
            $group['select'] = $no == $i;
            return $group;
        });
        file_put_contents($this->databasePath(), $source);
        $this->save($groups);
    }

    public function store()
    {
        $groups = app('request')->input();
        $groups = collect($groups)
            ->sortBy(function($group) { return $group['description']; })
            ->each(function($group, $i) use ($groups) {
                $key = array_search($group, $groups);
                if ($key === $i) return;
                if ($key === false) {
                    unlink($this->databasePath($i));
                } else {
                    $sourcePath = $this->databasePath($i);
                    $targetPath = $this->databasePath($key);
                    $source = file_get_contents($sourcePath);
                    $target = file_get_contents($targetPath);
                    file_put_contents($sourcePath, $target);
                    file_put_contents($targetPath, $source);
                }
            });
        $this->save($groups);
    }

    protected function save($groups)
    {
        file_put_contents(storage_path('groups.json'), $groups->values()->toJson());
    }

    protected function databasePath($no = null)
    {
        if (isset($no)) $no .= '_';
        return storage_path("{$no}database.json");
    }
}
