<?php

return [
    15 => [
        'indicators' => [
            1 => [
                'name' => 'Pembelajaran Dinamis',
                'items' => [
                    'Terdapat interaksi antar siswa',
                    'Terdapat interaksi antar siswa & guru',
                ],
            ],
            2 => [
                'name' => 'Siswa Antusias',
                'items' => [
                    'Menunjukkan sikap semangat',
                    'Penuh perhatian dalam pembelajaran',
                    'Ikut serta dalam kegiatan pembelajaran',
                ],
            ],
            3 => [
                'name' => 'Suasana Kelas Menyenangkan',
                'items' => [
                    'Siswa & Guru termotivasi',
                    'Pembelajaran melalui permainan/diskusi/peran/praktek',
                    'Penggunaan media pembelajaran yang mendukung',
                    'Materi yang disesuaikan dengan konteks kehidupan siswa',
                ],
            ],
            4 => [
                'name' => 'Tujuan Pembelajaran Tercapai',
                'items' => [
                    'Terdapat refleksi guru pada akhir pembelajaran',
                    'Hasil belajar siswa sesuai dengan tujuan pembelajaran',
                ],
            ],
        ],
        'levels' => [
            1 => [4],
            2 => [3, 4],
            3 => [1, 2, 3],
            4 => [1, 2, 3, 4],
        ],
    ],
];
