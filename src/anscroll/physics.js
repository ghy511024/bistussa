//
// physics.js
//
// the particle system itself. either run inline or in a worker (see worker.js)
//

var Physics = function (dt, stiffness, repulsion, friction, updateFn, integrator) {
    var active = {particles: {}, springs: {}}
    var SPEED_LIMIT = 1000 // 最大速率
    var that = {
        //劲度，弹性值
        stiffness: (stiffness !== undefined) ? stiffness : 1000,
        // 摩擦力
        friction: (friction !== undefined) ? friction : .3,
        // 时间，每次 trick 粒子运动的时间
        dt: (dt !== undefined) ? dt : 0.02,
        init: function () {
            return that
        },
        // 更新全局物理系数，如果是弹性系数，则active的弹簧，系数全部重新赋值
        modifyPhysics: function (param) {
            $.each(['stiffness', 'repulsion', 'friction', 'gravity', 'dt', 'precision', 'integrator'], function (i, p) {
                if (param[p] !== undefined) {
                    // 精度
                    if (p == 'precision') {
                        that.theta = 1 - param[p]
                        return
                    }
                    that[p] = param[p]

                    if (p == 'stiffness') {
                        var stiff = param[p]
                        $.each(active.springs, function (id, spring) {
                            spring.k = stiff
                        })
                    }
                }
            })
        },
        // 全局更新函数入口传入 {t:"addSpring", id:edge._id, fm:src, to:dst, l:len} 这样的值
        _update: function (changes) {
            // batch changes phoned in (automatically) by a ParticleSystem
            _epoch++
            $.each(changes, function (i, c) {
                if (c.t in that)
                    that[c.t](c)
            })
            return _epoch
        },
        tick: function () {
            // 更新力量
            that.updateForces()
            // 更新速率
            that.updateVelocity(that.dt)
            // 更新位置
            that.updatePosition(that.dt)
            that.tock()
        },
        // 回掉主线程更新
        tock: function () {
            var coords = []
            $.each(active.particles, function (id, pt) {
                coords.push(id)
                coords.push(pt.p.x)
                coords.push(pt.p.y)
            })
            if (updateFn)
                updateFn({geometry: coords, epoch: _epoch, energy: _energy, bounds: _bounds})
        },
        // Physics stuff   
//        更新力量
        updateForces: function () {
            // 计算排和引力
            if (that.repulsion > 0) {
                if (that.theta > 0)
                    that.applyBarnesHutRepulsion()
                else
                    that.applyBruteForceRepulsion()
            }
            if (that.stiffness > 0)
                that.applySprings()
            that.applyCenterDrift()
            if (that.gravity)
                that.applyCenterGravity()
        },
        // 根据弹性系数，计算弹簧拉伸力
        applySprings: function () {
            $.each(active.springs, function (id, spring) {
                var d = spring.point2.p.subtract(spring.point1.p); // the direction of the spring
                var displacement = spring.length - d.magnitude()//Math.max(.1, d.magnitude());
                var direction = ((d.magnitude() > 0) ? d : Point.random(1)).normalize()
                spring.point1.applyForce(direction.multiply(spring.k * displacement * -0.5))
                spring.point2.applyForce(direction.multiply(spring.k * displacement * 0.5))
            });
        },
        updateVelocity: function (timestep) {
            // 更新速率。
            var sum = 0, max = 0, n = 0;
            $.each(active.particles, function (id, point) {
                if (point.fixed) {
                    point.v = new Point(0, 0)
                    point.f = new Point(0, 0)
                    return
                }

                if (that.integrator == 'euler') {
                    point.v = point.v.add(point.f.multiply(timestep)).multiply(1 - that.friction);
                } else {
                    point.v = point.v.add(point.f.add(point._F.divide(point._m)).multiply(timestep * 0.5)).multiply(1 - that.friction);
                }
                point.f.x = point.f.y = 0

                var speed = point.v.magnitude()
                if (speed > SPEED_LIMIT)
                    point.v = point.v.divide(speed * speed)

                var speed = point.v.magnitude();// 速度的绝对值
                var e = speed * speed
                sum += e
                max = Math.max(e, max)
                n++
            });
            // 计算总能量，总数量，速度总和，平均值，个数
            _energy = {sum: sum, max: max, mean: sum / n, n: n}

        },
        updatePosition: function (timestep) {
            // translate velocity to a position delta
            var bottomright = null
            var topleft = null

            $.each(active.particles, function (i, point) {
                point.p = point.p.add(point.v.multiply(timestep));
            });
        },
    }
    return that.init()
}