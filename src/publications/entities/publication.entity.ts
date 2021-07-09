import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Publication{


    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 200, default: 'anon' })
    name: string;

    @Column({ length: 200, default: '-' })
    fullname: string;

    @Column({ length: 200, default: '-' })
    subject: string;

    @Column({ length: 800, default: 'Vacio' })
    description: string;

    @Column({default: 0})
    like: number;

    @Column({default: 0})
    dislike: number;

    @CreateDateColumn({
        name: 'creation_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
      })
      creationAt: Date;
      
    @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @Column({ length: 200, default: 'not image' })
    image: string;

    
}

/*Sript para generar una migracion: npm run migrations:generate -- nameMigration
  Sript para correr migraciones:    npm run migrations:run
*/